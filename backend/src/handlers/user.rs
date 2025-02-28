use crate::db::DbPool;
use crate::errors::AppError;
use crate::models::user::{self, NewUser, User};
use crate::schema::users::dsl::*;
use actix_web::{App, HttpResponse, Responder, web};
use diesel::dsl::exists;
use diesel::prelude::*;

pub async fn get_users(pool: web::Data<DbPool>) -> Result<impl Responder, AppError> {
    // Get a connection from the pool
    let mut conn = pool.get().map_err(|_| AppError::InternalServerError)?;

    // Use a blocking thread for database operations
    let users_list = web::block(move || users.load::<User>(&mut conn))
        .await
        .map_err(|_| AppError::InternalServerError)?
        .map_err(AppError::DatabaseError)?;

    Ok(HttpResponse::Ok().json(users_list))
}

pub async fn get_user_by_id(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
) -> Result<impl Responder, AppError> {
    let mut conn = pool.get().map_err(|_| AppError::InternalServerError)?;

    let user_id = user_id.into_inner();

    let user_result = web::block(move || -> Result<Option<User>, diesel::result::Error> {
        users.find(user_id).first::<User>(&mut conn).optional()
    })
    .await
    .map_err(|_| AppError::InternalServerError)?
    .map_err(AppError::DatabaseError)?;

    match user_result {
        Some(user) => Ok(HttpResponse::Ok().json(user)),
        None => Err(AppError::NotFoundError(format!(
            "User with ID {} not found",
            user_id
        ))),
    }
}

pub async fn create_user(
    pool: web::Data<DbPool>,
    new_user: web::Json<NewUser>,
) -> Result<impl Responder, AppError> {
    let mut conn = pool.get().map_err(|_| AppError::InternalServerError)?;
    let new_user = new_user.into_inner();

    let user = web::block(move || -> Result<User, diesel::result::Error> {
        diesel::insert_into(users)
            .values(&new_user)
            .returning(User::as_returning())
            .get_result(&mut conn)
    })
    .await
    .map_err(|_| AppError::InternalServerError)?
    .map_err(AppError::DatabaseError)?;

    Ok(HttpResponse::Created().json(user))
}

pub async fn delete_user(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
) -> Result<impl Responder, AppError> {
    let user_id = user_id.into_inner();

    async fn db_delete_user(pool: &DbPool, user_id: i32) -> Result<(), AppError> {
        let mut conn = pool.get().map_err(|_| AppError::InternalServerError)?;
        let exists = web::block(move || {
            diesel::select(diesel::dsl::exists(users.find(user_id))).get_result::<bool>(&mut conn)
        })
        .await
        .map_err(|_| AppError::InternalServerError)?
        .map_err(AppError::DatabaseError)?;

        if !exists {
            return Err(AppError::NotFoundError(format!(
                "User with ID {} not found",
                user_id
            )));
        }

        let mut conn = pool.get().map_err(|_| AppError::InternalServerError)?;

        web::block(move || diesel::delete(users.find(user_id)).execute(&mut conn))
            .await
            .map_err(|_| AppError::InternalServerError)?
            .map_err(AppError::DatabaseError)?;

        Ok(())
    }

    db_delete_user(&pool, user_id).await?;

    Ok(HttpResponse::NoContent().finish())
}

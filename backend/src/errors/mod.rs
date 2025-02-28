use actix_web::{HttpResponse, ResponseError};
use diesel::result::Error as DieselError;
use serde::Serialize;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Database error: {0}")]
    DatabaseError(#[from] DieselError),
    #[error("Internal server error")]
    InternalServerError,
    #[error("Not found: {0}")]
    NotFoundError(String),
    #[error("Bad Request: {0}")]
    BadRequestError(String),
}

#[derive(Serialize)]
struct ErrorResponse {
    message: String,
}

impl ResponseError for AppError {
    fn error_response(&self) -> HttpResponse {
        let message = self.to_string();
        let response = ErrorResponse { message };

        match self {
            AppError::DatabaseError(_) => {
                HttpResponse::InternalServerError().json(response)
            }
            AppError::InternalServerError => {
                HttpResponse::InternalServerError().json(response)
            }
            AppError::NotFoundError(_) => {
                HttpResponse::NotFound().json(response)
            }
            AppError::BadRequestError(_) => {
                HttpResponse::BadRequest().json(response)
            }
        }
    }
}
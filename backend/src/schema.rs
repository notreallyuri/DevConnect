// @generated automatically by Diesel CLI.

diesel::table! {
    comments (id) {
        id -> Int4,
        content -> Text,
        posts_id -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        author_id -> Varchar,
    }
}

diesel::table! {
    posts (id) {
        id -> Varchar,
        content -> Text,
        embeds -> Jsonb,
        user_id -> Varchar,
        updated_at -> Timestamp,
        created_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Varchar,
        username -> Varchar,
        email -> Varchar,
        created_at -> Timestamp,
    }
}

diesel::joinable!(comments -> posts (posts_id));
diesel::joinable!(comments -> users (author_id));
diesel::joinable!(posts -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    comments,
    posts,
    users,
);

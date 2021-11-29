#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
use serde_json::json;
use rocket::response::content;
use postgres::{Client, NoTls};

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[post("/post_test", format="application/json", data="<data>")]
fn test(data : String) -> String {
    println!("Received data: {:?}", data);
    "Data received successfully!".to_string()
}

#[get("/get_products")]
fn get_products() -> content::Json<String> {
    let test_data = json!([
        {
            "name": "test product",
            "description": "",
            "price": 5.0,
            "image": ""
        }
    ]);

    content::Json(test_data.to_string())
}

fn main() {
    rocket::ignite()
    .mount("/", routes![index, get_products]).launch();
}
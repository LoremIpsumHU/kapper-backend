#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[post("/post_test", format="application/json", data="<data>")]
fn test(data : String) -> String {
    println!("Received data: {:?}", data);
    "Data received successfully!".to_string()
}

fn main() {
    rocket::ignite()
    .mount("/", routes![index, test]).launch();
}
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[post("/post_test", format="application/json", data="<data>")]
fn test(data : String) -> String {
    println!("Received data: {:?}", data);
    "Data received sucessfully!".to_string()
}

fn main() {
    println!("{}", "hi");
    rocket::ignite()
    .mount("/", routes![index, test]).launch();
}
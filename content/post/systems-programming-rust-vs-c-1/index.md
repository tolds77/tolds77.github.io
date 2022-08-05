---
title: "Learning Systems Programming: Rust vs C (Part 1)"
date: "2016-05-02T22:10:46-05:00"
tags:
#- rust
authors:
- jamesolds
---

I've been wanting to learn systems programming for a long time now. After reading about Rust every-other-day on Hacker News I've been dying to dive into it but have found that most tutorials online get kind of tough to follow for those of us without a C/C++ background. So, I found a copy of [The C Programming Language](http://www.amazon.com/Programming-Language-Brian-W-Kernighan/dp/0131103628) on Amazon for 15 bucks and will be learning both C and Rust at the same time by doing the exercises in Kernighan & Ritchie's highly praised 2nd edition book. One of the ways I learn best is by teaching. Given that I am learning this as I'm going, don't take everything here as the gospel. Having said that, I'll do my best to accurately describe the material. After all, that's another great benefit of teaching while you learn: you have to make sure you are confident in your understanding of a topic before teaching it as fact.

My background: I have taken two courses on Java in school, and have been messing around with Python on my own for a while now. I know loops, conditionals, functions, arrays, object orientation, string manipulation, etc and I'm assuming the reader does as well.

All of the code can be found on https://github.com/oldsjam/learnsystems



### 1.1 Getting Started

Right off the bat, I do like rust's println! macro which saves you from an ugly "\n" in your code. The standard library in C is opt-in while it is in scope by default in Rust. Not a huge deal but its nice to not have to explicitly include it in practically every program you write. I think it's strange to have printing done by a macro, simply because I've never seen it done that way before. Looking forward to reading more about macros and the Rust team's reasoning behind going that route vs a function/method.

example.c
```c
#include <stdio.h>

main() {
  printf("hello, world\n");
}
```

example.rs
```rust
fn main() {
  println!("hello, world");
}
```

### 1.2 Variables and Arithmetic Expressions

We get to try out some fancy features of the Rust language here with a pattern variable binding:
```rust
let (lower, upper, step) = (0.0, 300.0, 20.0)
```
and by describing the fahr variable as mutable with the mut keyword. By default, everything in Rust is immutable and if, for example you'd like a variable to be able to be changed in the future without reassigning it with let, you have to use the mut keyword. I like secure-by-default and it's not a huge inconvenience so this is great. I found the formatting this exercise a little tough in Rust. Firstly, I had to use a macro to get the float numbers to only show 1 decimal place:
```rust
format!("{:.*}", 1, ((5.0/9.0) * (fahr-32.0)));
```
Then, I had to read more on Rust's formatting syntax to get it to give me the same right-justified, tabbed output as we had in C. At first pass, I think the C syntax here make more sense but I can see Rust's formatting syntax being more powerful in the long run. By the way, it's really nice not to have to a) declare variables in advance as we had to in C, and b) Rust's type-inference lets us not have to worry manually describing the types of our variables either (at least not yet).

example.c
```c
#include <stdio.h>

main() {
	float fahr, celsius;
	int lower, upper, step;

	lower = 0;
	upper = 300;
	step = 20;

	fahr = lower;
	while (fahr <= upper) {
		celsius = (5.0/9.0) * (fahr-32.0);
		printf("%3.0f %6.1f\n", fahr, celsius);
		fahr = fahr + step;
	}
}
```

example.rs
```rust
fn main() {
	let (lower, upper, step) = (0.0, 300.0, 20.0);

	let mut fahr = lower;
	while fahr <= upper {
		let celsius = format!("{:.*}", 1, ((5.0/9.0) * (fahr-32.0)));
		println!("{:>3} {:>6}", fahr, celsius);
		fahr += step;

	}
}
```


### 1.3 The For Statement

This part got a little interesting because I had to switch to Rust nightly just to be able to change the step size of the for loop iterator. After getting all that sorted, and adding #![feature(step_by)] to my code I was able to get the equivalent output as the C exercise using only a for loop. This also required me to manually cast fahr as a float in order to perform the Fahrenheit to Celsius conversion.

example.c
```c
#include <stdio.h>

main() {
	int fahr;

	printf("Fahrenheit\tCelsius\n");
	for (fahr = 0; fahr <= 300; fahr = fahr + 20) {
		printf("%3d %18.1f\n", fahr, (5.0/9.0) * (fahr-32.0));
	}
}
```

example.rs
```rust
#![feature(step_by)]

fn main() {
	println!("Fahrenheit {:^18}", "Celsius");
	for fahr in (0..300).step_by(20) {
		println!("{:>3} {:>18}", fahr, format!("{:.*}", 1, ((5.0/9.0) * (fahr as f64-32.0))));
	}
}
```
### 1.4 Symbolic Constants
Pretty simple stuff here, we're just defining constants for the numbers 0, 20, and 300 so that it's more obvious what the numbers are for, especially since they should not need to be changed. In rust, we have to manually define a constant's type with the following syntax:
```rust
const LOWER: i32 = 0;
```
The constant's name is LOWER, and i32 is it's type. Rust is a strongly typed language, essentially meaning that all data must have a type in order to compile. This provides the compiler with the information it needs in order to make sure unsafe operations aren't happening. For example, we defined LOWER as an i32, meaning a 32bit integer. If the compiler did not care about LOWER's type, and we were to perform an operation on it that caused it to be larger than 2,147,483,647 (2^32 in two's compliment), it would cause "undefined behavior" and almost certainly crash. Rust is great because it stops these types of problems while providing type inference so that you as the programmer do not have to explicitly define the type  in most cases.

example.c
```c
#include <stdio.h>

#define    LOWER    0
#define    UPPER    300
#define    STEP     20

main() {
    int fahr;

    for (fahr = LOWER; fahr <= UPPER; fahr+= STEP)
        printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));
}
```

example.rs
```rust
#![feature(step_by)]

const LOWER: i32 = 2147483648;
const UPPER: i32 = 300;
const STEP: i32 = 20;

fn main() {
	for fahr in (LOWER..UPPER).step_by(STEP) {
		println!("{:>3} {:>6}", fahr, format!("{:.*}", 1, ((5.0/9.0) * (fahr as f64-32.0))));
	}
}
```

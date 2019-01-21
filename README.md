# Becode - Email Checker

> A basic NodeJS CLI tool to check breaches in email addresses - part of BeCode's studentship

* * *

> Note : My English is like my humor - quite dysfunctional but I'm working on it. Please let me know if you see any typo or bug and I'll try to fix it ASAP ;)


## Installation

```
npm install @tanguyscholtes/becode-emailChecker
```

And voilà ! You're good to go.


## Usage

Once you have completed the installation, you can simply check an email address by going in a terminal and typing :

```
emailChecker test@example.com
```

Simply replace this example by the real email address you'd like to check for breaches. Quite simple, hu ?


## Dependencies

The core of this tool uses [email-validator](https://www.npmjs.com/package/email-validator) to validate emails (duh), [Have I Been Pwned](https://haveibeenpwned.com/)'s API to check for account breaches and [axios](https://www.npmjs.com/package/axios) to contact this API.  
The fancy part comes from [chalk](https://www.npmjs.com/package/chalk) and their pretty colors.

Thanks to all of them for their great work. Keep being awesome !


## Part of BeCode's studentship

I made this code as a trainee at [BeCode](https://becode.org/). If you'd like to check the exercise's specificities, you can [read it all here](https://github.com/becodeorg/LIE-Hamilton-1.7/tree/master/02-La-colline/02-NodeJS/01-cli) (it's only available in French, thought. Sorry pals !).

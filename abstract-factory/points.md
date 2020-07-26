* This pattern is property combinator
* I don't like a concept of AbstractHero in OOP version, 
each hero is unique and has unique list of abilities, in our case each hero is forced to have
move, fight and heal abilities. Therefore we have to use hacks like NullFight etc.
* OOP says the benefit is that we can build abstract code that can operate with hero
and doesn't have to know which exact hero type we are working with but that is also a problem, because
program can't know all peculiarities of the concrete hero and will have to do additional checks
which is ugly
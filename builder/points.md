* no way to force order within builder, we can create e.g. BadBuilder which will first salt and then
bake basis but obviously there is only 1 correct way to bake bread
* I don't like that builder itself stores state of the product, the builder that baker injects may
already have some state
* Maybe some kind of state machine will fit better to solve the same problem
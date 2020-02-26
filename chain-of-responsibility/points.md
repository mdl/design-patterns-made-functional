* handler doesn't have to know about next handler therefore
code is less coupled
* why handler should know about next handler ? he can just notify that his work is done.
* if the functions have side effect, it may be Kleisli arrow composition (more plainly spoken as monadic function composition.)

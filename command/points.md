* client does not know about executors, he just has
 collection of commands with their simple interface
* commands can do anything and client does not know 
* different command can have different executors
* state modification can be implemented via fold/reduce
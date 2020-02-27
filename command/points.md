"Паттерн "Команда" (Command) позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта. Этот объект запроса на действие и называется командой. При этом объекты, инициирующие запросы на выполнение действия, отделяются от объектов, которые выполняют это действие."


* client does not know about executors, he just has
 collection of commands with their simple interface
* commands can do anything and client does not know 
* different command can have different executors
* state modification can be implemented via fold/reduce

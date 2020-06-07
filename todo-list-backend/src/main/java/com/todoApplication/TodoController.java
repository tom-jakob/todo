package com.todoApplication;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/todo/")
public class TodoController {

//	private final TodoRepository todoRepository;	

	private TodoRepository todoRepository;

	public TodoController(TodoRepository todoRepository) {

		this.todoRepository = todoRepository;
	}

//	
//	@Autowired
//	@Qualifier("todoRepository")
//	TodoRepository todoRepository;

	@PostMapping
	public ResponseEntity<Todo> save(@Valid @RequestBody Todo todo) {
		todoRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);

	}

	@PostMapping("saveall")
	public ResponseEntity<List<Todo>> saveAll(@Valid @RequestBody List<Todo> todos) {

		for (Todo todo : todos) {
			todo.setTimeStart(todo.getTimeStart().toString());
			todo.setTimeEnd(todo.getTimeEnd().toString());
		}

		todoRepository.saveAll(todos);
		return new ResponseEntity<List<Todo>>(todos, HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<Optional<Todo>> findById(@PathVariable Integer id) {
		if (!todoRepository.existsById(id)) {
			return new ResponseEntity<Optional<Todo>>(HttpStatus.NOT_FOUND);
		} else {
			Optional<Todo> maybeTodo = todoRepository.findById(id);
			return new ResponseEntity<Optional<Todo>>(maybeTodo, HttpStatus.OK);

		}

	}

	@GetMapping
	public ResponseEntity<List<Todo>> findAll() {

		List<Todo> maybeToDos = todoRepository.findAll();
		return new ResponseEntity<List<Todo>>(maybeToDos, HttpStatus.OK);
	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {

		if (!todoRepository.existsById(id)) {
			return new ResponseEntity<Todo>(HttpStatus.NOT_FOUND);
		} else {
			todoRepository.deleteById(id);
			return new ResponseEntity<Todo>(HttpStatus.OK);
		}

	}

	@PutMapping("update/{id}")
	public ResponseEntity<Todo> update(@PathVariable Integer id, @RequestBody Todo todo) {
		if (!todoRepository.existsById(id)) {
			return new ResponseEntity<Todo>(HttpStatus.NOT_FOUND);
		} else {
			todo.setId(id);
			todoRepository.save(todo);
			return new ResponseEntity<Todo>(HttpStatus.OK);
		}
	}

}

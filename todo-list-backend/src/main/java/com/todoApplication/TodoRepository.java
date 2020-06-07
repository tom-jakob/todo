package com.todoApplication;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
@Qualifier("todoRepository")
public interface TodoRepository extends JpaRepository<Todo, Integer> {

}

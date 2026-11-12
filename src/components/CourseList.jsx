import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  function handleAdd(event) {
    event.preventDefault();

    const trimmedName = newName.trim();
    if (trimmedName === '') return;

    setCourses(previous => {
      const nextId = previous.length === 0 ? 1 : previous[previous.length - 1].id + 1;
      const newCourse = {
        id: nextId,
        name: trimmedName,
        category: 'Elective',
        completed: false,
      };
      return [...previous, newCourse];
    });
    setNewName('');
    setStatusFilter('all');
  }

  function handleToggle(id) {
    setCourses(previous => previous.map(course =>
      course.id === id
        ? { ...course, completed: !course.completed }
        : course
    ));
  }

  const doneCount = courses.filter(course => course.completed).length;

  let visibleCourses = courses;
  if (statusFilter === 'completed') {
    visibleCourses = courses.filter(course => course.completed);
  }
  if (statusFilter === 'active') {
    visibleCourses = courses.filter(course => !course.completed);
  }

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>Learning Courses</h2><span className="small-note">{visibleCourses.length} / {courses.length} courses</span></div>
        <p className="todo">과목을 추가하고 완료 상태를 체크하거나 필터링할 수 있습니다.</p>
        <form className="add-form" onSubmit={handleAdd}>
          <input className="input" value={newName} onChange={event => setNewName(event.target.value)} placeholder="새 과목명을 입력하세요" aria-label="새 과목명" />
          <button className="btn primary" type="submit">+ Add Course</button>
        </form>
        <div className="tools">
          <select className="input select" value={statusFilter} onChange={event => setStatusFilter(event.target.value)} aria-label="완료 상태 필터">
            <option value="all">전체 과목</option>
            <option value="active">진행 중</option>
            <option value="completed">완료</option>
          </select>
        </div>
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {visibleCourses.length === 0 && <div className="empty">조건에 맞는 과목이 없습니다.</div>}
        {visibleCourses.map(course => (
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </section>
    </>
  );
}

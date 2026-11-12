22300330/박찬


step2 source code explloration

1.주요 파일

App.jsx

전체 화면을 구성한다. 제목과 설명을 보여준고 CourseList를 화면에 출력한다.
왜 주요파일 3개중 하나로 선택하였는지는 main.jsx는 사실상 app jsx의 렌더만을 진행하므로 app이 사실상의 중심 jsx 파일이다.

CourseList.jsx
부모로서 웹페이지의  전체과목,완료, 진행중이라는 정보를 보여주고 courselist를 자식으로서 map으로 랜더링한다.



CourseItem.jsx
courselist의 자식으로서 체크박스와 삭제 버튼이 있다.
이벤트가 발생하면 부모 함수를 호출한다.
props의 함수로써 받는 onDelete , onToggle은 각각 click과 change이벤트에 따라 부모에게 다시 상호작용을 한다. 근데 체크박스는 구현이 아더ㅚ;ㄴ거 같다.



2.Component & Props

CourseList와 CourseItem

CourseList는 부모 컴포넌트고CourseItem은 자식 컴포넌트다.
부모는 course, onDelete, onToggle을 자식에게 전달한다.
자식은 위에도 적었다 시피 버튼이나 체크박스 이벤트(onclick시 onDelete, onChange시 onToggle)를 부모에게 전달한다.


State와 Event

courses는 과목 객체를 저장하는 배열이고 newName은 입력 중인 과목명을 저장하는 문자열이다.
상태가 바뀌면 React가 화면을 다시 그리도록 한다.

삭제 버튼을 누르면 과목 id가 부모에게 전달된다.handleDelete는 filter를 사용해 선택한 id를 제외한 새 배열을 만든다.
setCourses가 새 배열을 상태에 저장한면 React가 그 내용만 사라진 배열을 화면에 다시그리는 것이다. 
그러면 사용자 입장에서는 선택한 과목이 화면에서 사라지는거다.

주요 코드 1
부모와 자식의 상호작용

export default function CourseItem({ course, onDelete, onToggle }) {
  return (
    <div className="course-row">
      <div className="course-main">
        <input
          className="check"
          type="checkbox"
          checked={course.completed}
          onChange={() => onToggle(course.id)}
          aria-label={`${course.name} 완료 여부`}
        />

CourseItem은 부모에게 Props를 받는다.
체크 상태는 course.completed로 결정된다.
체크박스를 누르면 onToggle이 실행된다.
이때 과목 id가 부모에게 전달된다.

주요 코드 2
courses와 newName 사용
step2에서 기능 구현 전 코드를 기준으로 분석했다.

<div className="panel-header"><h2>Learning Courses</h2><span className="small-note">{courses.length} courses</span></div>
<p className="todo">실습 과제: 아래 Add 버튼과 완료 체크박스의 기능을 직접 구현하세요.</p>
<form className="add-form" onSubmit={handleAdd}>
  <input className="input" value={newName} onChange={event => setNewName(event.target.value)} placeholder="새 과목명을 입력하세요" aria-label="새 과목명" />
  <button className="btn primary" type="submit">+ Add Course</button>
</form>
<div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
{courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
{courses.map(course => (
  <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
))}

newName은 입력창 값으로 사용된다.
입력할 때마다 setNewName이 실행된다.
courses.length는 과목 수를 보여준다.
courses.map은 과목마다 CourseItem을 만든다.
상태가 바뀌면 입력창과 목록도 다시 표시된다.

step3. 수정한 내용

초기 과목 5개 courses.js에 추가

React Application Development,Open Source Collaboration,Git & GitHub Workflow,UI/UX Design Basics,Cloud Deployment,Software Testing

화면 문구는

제목을 Developer Course Tracker.
설명을 개발 학습 관리 내용으로,
상단 태그와 하단 문구도 수정.

App.css
배경을 밝은 녹색으로,버튼과 체크박스에도 녹색을 적용했다.
카드 테두리와 그림자를 바꿨다. 입력창 포커스 색상도 바꿨다.



step4. 기능 추가


CourseList.jsx에 

과목 추가

입력한 과목명을 newName에 저장한다. 이때 빈 값이면 추가하지 않는다,새 과목은 미완료 상태로 courses 배열 끝에 추가한다.

완료 상태 변경

체크박스를 누르면 handleToggle이 실행된다. map으로 선택한 과목을 찾는다. completed 값을 반대로 바꾼다.
완료 상태와 상단 통계가 바로 바뀐다.

완료 필터

전체 과목, 진행 중, 완료 중 하나를 선택한다.
filter로 조건에 맞는 과목만 보여준다.
원래 courses 배열은 바꾸지 않는다.



6. AI 활용

코드 구조를 이해할 때 사용했다.
React 상태 흐름을 확인할 때 사용했다.
화면 수정 계획과 코드 변경에 사용했다.
과목 추가, 완료 변경, 완료 필터 구현에 사용했다.


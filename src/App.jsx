import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">2026 · DEVELOPER LEARNING PLAN</p><h1>Developer Course Tracker</h1><p className="subtitle">Plan, track, and complete your development courses.</p></div>
        <span className="tag">LEARNING DASHBOARD</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>Developer Course Tracker</span><span>React state · Local session</span></footer>
    </main>
  );
}

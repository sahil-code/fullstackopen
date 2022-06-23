const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => <div>{parts.map(part => <Part part={part} />)}</div>

const Course = ({ course }) => <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>

export default Course
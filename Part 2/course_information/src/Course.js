const Header = ({ course }) => <h1>{course}</h1>
const Part=({part})=>{ 
    return(
        <p> {part.name} {part.exercises}</p>
    )
}
const Sum=({sum})=>{
    const sumNumber=sum.reduce((accumulator,currentValue)=>accumulator+currentValue.exercises,0)
    return(
        <p>total of {sumNumber} exercises</p>
    )
}
const Content=({parts})=>{
    console.log(parts)
    return(
        parts.map(part=>
            <div key={part.id}>
                <Part part={part}/>
            </div>
        )
    )
}

const Course=({course})=>{
    return(
        course.map(lesson=>
            <div key={lesson.id}>
            <Header course={lesson.name} />
            <Content parts={lesson.parts} />
            <Sum sum={lesson.parts}/>
            </div>
            )
    )
}


export default Course
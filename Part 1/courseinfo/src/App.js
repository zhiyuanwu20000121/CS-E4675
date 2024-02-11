const Header = (props) =>{
  console.log(props)
  return(
    <h2>{props.course.name}</h2>
  )
}
const Content = (props) =>{
  return(
    <div>
      <Part name={props.content.parts[0].program} number={props.content.parts[0].exercise}/>
      <Part name={props.content.parts[1].program} number={props.content.parts[1].exercise}/>
      <Part name={props.content.parts[2].program} number={props.content.parts[2].exercise}/>
    </div>
  )
}
const Total = (props) =>{
  return(
    <div>
      <p>Total number of exercises {props.num.parts[0].exercise +props.num.parts[1].exercise + props.num.parts[1].exercise}</p>
    </div>
  )
}

const Part =(props)=>{
  return(
    <div>
      <p>The name is {props.name},The number of exercise is {props.number}</p>
    </div>
  )
}

const App = () => {
  const content={
    name:'Half Stack application development',
    parts:[
      {
        program:'Fundamentals of React',
        exercise:10
      ,
      },
      {
        program:'Using props to pass data',
        exercise:7
      },
      {
        program:'State of a component',
        exercise:14
      }
    ]
  }
  console.log(content.parts.length)

  return (
    <div>
      <Header course={content}/>
      <Content content={content}/>
      <Total num={content}/>
    </div>
  )
}

export default App
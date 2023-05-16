export default function Card(props) {

const styles = {
//     backgroundImage: `url(${require('./assets/${props.img}').default})`
        backgroundImage: `url('./assets/${props.img}')`
        
 }

 console.log(styles)
    return (
        <div className='card' style={styles}>
            <h3>{props.title}</h3>
        </div>
    )
}


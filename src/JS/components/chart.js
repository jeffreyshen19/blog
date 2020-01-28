console.log("YOOO");

export default class Chart extends React.Component{
  constructor(props)
    {
        super(props);
        this.state = { color : '#4cb96b' };
    }

    getClick()
    {
        if (this.state.color === '#4cb96b')
            this.setState({ color : '#aaa' });
        else
            this.setState({ color : '#4cb96b' });
    }

    render()
    {
        return <h1 style = { this.state }
                   onClick = {this.getClick.bind(this)}>
               {this.props.title} < /h1>
  } 
}

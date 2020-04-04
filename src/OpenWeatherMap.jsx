// React
const e = React.createElement;

const Button = ({ ...prop }) => {
    const {
        label,
    } = prop;

    return (
        <button onClick={() => alert('button works')}>{label}</button>
    );
};

class OpenWetaherMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { working: true };
    }

    render() {
        if (this.state.working) return <Button label={'My New Button'} />;
    }
}

const domContainer = document.querySelector('#react-app');
ReactDOM.render(e(OpenWetaherMap), domContainer);

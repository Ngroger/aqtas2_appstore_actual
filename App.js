import { Component } from 'react';
import { FontLoader } from './src/helpers/FontLoader'
import AppNavigationContainer from './src/components/ux/navigation/AppNavigation';
import { UnauthProvider } from './src/context/UnauthProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    }
  }

  async componentDidMount() {
    await FontLoader(); // Вызываем функцию загрузки шрифтов
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <AppNavigationContainer />
      );
    } else {
      return null;
    }
  }
};

export default App;
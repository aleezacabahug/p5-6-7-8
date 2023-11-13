import React from 'react';
import {
    AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';
import fetchModel from "../../lib/fetchModelData";
import { AdvancedFeaturesContext } from '../path-to-your-main-file'; // Adjust the import path
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * Define TopBar, a React componment of project #5
 */
class TopBar extends React.Component {
    static contextType = AdvancedFeaturesContext;

    constructor(props) {
        super(props);
        this.state = {
            app_info: undefined
        };
    }

    renderCheckbox() {
        const { advancedFeatures, setAdvancedFeatures } = this.context;

        const handleToggle = (event) => {
            setAdvancedFeatures(event.target.checked);
        };

        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={advancedFeatures}
                        onChange={handleToggle}
                        inputProps={{ 'aria-label': 'Enable Advanced Features' }}
                    />
                }
                label="Enable Advanced Features"
            />
        );
    }

    componentDidMount() {
        this.handleAppInfoChange();
    }

    handleAppInfoChange(){
        const app_info = this.state.app_info;
        if (app_info === undefined){
            fetchModel("/test/info")
                .then((response) =>
                {
                    this.setState({
                        app_info: response.data
                    });
                });
        }
    }
  render() {
    return this.state.app_info ? (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Bug Busters</Typography>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} color="inherit">{this.props.main_content}</Typography>
            <Typography variant="h5" component="div" color="inherit">Version: {this.state.app_info.__v}</Typography>
            {this.renderCheckbox()}
        </Toolbar>
      </AppBar>
    ) : (
        <div/>
    );
  }
}

export default TopBar;

import React, {Component, StrictMode} from 'react';
//import {action} from '@storybook/addon-actions';
//import {noArgsDecorator, viewerMouseEventDecorator, viewerTouchEventDecorator} from 'actions-decorator';
import {AutoSizer} from 'react-virtualized';
//import {boolean} from '@storybook/addon-knobs';
import {INITIAL_VALUE, POSITION_BOTTOM,UncontrolledReactSVGPanZoom,ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import Snake from './snake.svg';

const toolbarProps = {position: POSITION_BOTTOM}

export default class AutosizerViewer extends Component {
  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <AutoSizer>
          {(({width, height}) => width === 0 || height === 0 ? null :
              <Viewer width={width} height={height}/>
          )}
        </AutoSizer>
      </div>
    )
  }
}


class Viewer extends Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <StrictMode>
        <UncontrolledReactSVGPanZoom
          width={this.props.width} height={this.props.height}
          ref={Viewer => this.Viewer = Viewer}

          toolbarProps={toolbarProps}
>

          <svg width={1440} height={1440}>
            <Snake/>
          </svg>
        </UncontrolledReactSVGPanZoom>
      </StrictMode>
    )
  }
}

import React from 'react';
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter
} from 'react-svg-pan-zoom';
import {AutoSizer} from 'react-virtualized'
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader'

/* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
export default class App extends React.PureComponent {

  state = {tool: TOOL_NONE, value: INITIAL_VALUE}
  Viewer = null

  componentDidMount() {
    if(this.Viewer!=null){
      this.Viewer.fitToViewer();
    }
  }
  

  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  fitToViewer() {
    this.setState(state => ({value: fitToViewer(state.value)}))
  }

  fitSelection() {
    this.setState(state => ({value: fitSelection(state.value, 40, 40, 200, 200)}))
  }

  zoomOnViewerCenter() {
    this.setState(state => ({value: zoomOnViewerCenter(state.value, 1.1)}))
  }
/*
       <AutoSizer>
          {(({width, height}) => width === 0 || height === 0 ? null : (

                  ))}
          </AutoSizer>
 */
  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <AutoSizer>
          {(({width, height}) => width === 0 || height === 0 ? null : (

        <ReactSvgPanZoomLoader src="primes.svg" render= {(content) => (

        <ReactSVGPanZoom
          width={width} height={height}
          ref={Viewer => this.Viewer = Viewer}
          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value} onChangeValue={value => this.changeValue(value)}

          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
        >
          <svg width={3480} height={3480}>
          <g>
          <rect x="740" y="740" width="2000" height="2000" fill="#a0a0a0" stroke="#f4f142"/>
          <rect x="1240" y="1240" width="1000" height="1000" fill="#ffffff" stroke="#f4f142"/>
           </g>

          {content}
          </svg>
        </ReactSVGPanZoom>


          )}/>
          ))}
          </AutoSizer>
      </div>
    )
  }
}
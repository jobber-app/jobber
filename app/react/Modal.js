import React from "react";
import { observer } from "mobx-react";

export default @observer class Modal extends React.Component {
    componentWillMount () {
        this.closeHandler = this.props.onClose;
        if (this.closeHandler === undefined) this.closeHandler = () => {}
    }

    render () {
        return (
        <div ref={ el => this.el = el } class="modal fade" id={ this.props.name } tabIndex="-1" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{ this.props.title }</h5>
                        <button type="button" class="close" data-dismiss="modal" onClick={ this.closeHandler }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style={{ "maxHeight": "60vh", "overflowY": "scroll" }}>
                        { this.props.children }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

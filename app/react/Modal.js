import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import $ from "jquery";

export default @observer class Modal extends React.Component {
    componentWillMount () {
        autorun(_ => {
            if (this.props.showing) this.open();
            else this.close();
        });
        $("#" + this.props.name).on("hide.bs.modal", this.props.onClose);
    }

    open () {
        $("#" + this.props.name).modal("show");
    }
    close  () {
        $("#" + this.props.name).modal("hide");
    }

    render () {
        return (
        <div id={ this.props.name } class="modal fade" tabIndex="-1" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{ this.props.title }</h5>
                        <button type="button" class="close" onClick={ this.props.onClose }>
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

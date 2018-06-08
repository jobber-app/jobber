import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react";

export default @observer class Modal extends React.Component {
    componentWillMount () {
        autorun(_ => {
            if (this.props.showing) this.open();
            else this.close();
        });
    }

    open () {
        if (this.el == undefined) return;
        //$("#" + this.props.name).modal("show");
        document.body.classList.add("modal-open");
        this.el.style.display = "block";
        this.el.classList.add("show");
        this.el.hidden = null;

        if (this.backdrop == undefined) {
            this.backdrop = document.createElement("div");
            this.backdrop.className = "modal-backdrop fade show";
            document.body.appendChild(this.backdrop);
        }
    }
    close  () {
        if (this.el == undefined) return;
        //$("#" + this.props.name).modal("hide");
        document.body.classList.remove("modal-open");
        this.el.classList.remove("show");
        this.el.style.display = null;
        this.el.hidden = "true";

        if (this.backdrop != undefined) {
            document.body.removeChild(this.backdrop);
            this.backdrop = undefined;
        }
    }

    render () {
        return (
<div id={ this.props.name } 
     ref={ el => this.el = el }
     class="modal fade" 
     tabIndex="-1"
     >
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{ this.props.title }</h5>
                <button type="button" class="close" 
                        onClick={ this.props.onClose }>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                { this.props.children }
            </div>
        </div>
    </div>
</div>
        );
    }
}

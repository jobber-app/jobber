import React from "react";
import { observer } from "mobx-react";

export default @observer class Selector extends React.Component {
    itemToEl (item) {
        return item;
    }
    elToListItem (item) {
        return <a class="list-group-item" data-dismiss={ "#" + this.props.name } onClick={ this.props.onResult }>{ item }</a>
    }
    render () {
        return (
        <div class="modal fade" id={ this.props.name } tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{ this.props.title }</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style={{ "max-height": "60vh", "overflow-y": "scroll" }}>
                        <div class="list-group h-100">
                            this.props.items.map(this.itemToEl).map(this.elToListItem);
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

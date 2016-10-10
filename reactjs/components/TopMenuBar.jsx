import React from 'react';
import {
  Nav, NavItem
} from 'react-bootstrap';

import {
  resetUploadErrorStatus, saveImageProcessing, showSpinner, undoImageProcessing
} from '../actions/imageActions';

import CustomAlert from './CustomAlert';
import UploadImageModal from './TopMenuBar/UploadImageModal';


export default class TopMenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultFolderId: null,
      uploadAlertVisible: false,
      shareIsDisabled: true,
      shareAlertVisible: false,
      showUploadModal: false
    };
  }

  componentWillReceiveProps(nextprops) {
    // enable if there is an image on image pane
    if (nextprops.activeImage.id) {
      this.setState({ shareIsDisabled: false})
    }
  }

  onChildChanged(childKey, state) {
    // update visibility of alert from child
    this.setState({ [childKey]: state});
  }

  handleShare() {
    const fbShareHref = (`https://www.facebook.com/sharer/sharer.php?u=
      ${encodeURIComponent(this.props.activeImage.url)}&amp;src=sdkpreparse`
    );

    if (this.props.processingInProgress) {
      this.setState({ shareAlertVisible: true });
    } else {
      window.open(fbShareHref, '_blank');
    }
  }

  open() {
    if (this.props.folders.folders.length > 0) {
      this.setState({
        defaultFolderId: this.props.folders.folders[0].id,
        showUploadModal: true
      });
    } else {
      this.setState({ uploadAlertVisible: true });
    }
  }

  save() {
    this.props.dispatch(showSpinner());
    this.props.dispatch(saveImageProcessing(
      this.props.token, this.props.activeImage
    ));
  }

  undo() {
    this.props.dispatch(showSpinner());
    this.props.dispatch(undoImageProcessing(this.props.token));
  }

  render() {
    const shareAlertMessage = (
      "You need to either cancel or save the current changes to share image"
    );
    const uploadAlertMessage = (
      'You need to create a folder first before you can upload an image!!!'
    )

    return (
      <Nav
        bsStyle="pills"
        pullRight
      >
        <NavItem
          eventKey={1} href="#"
          ref="UploadImageButton"
          onClick={this.open.bind(this)}
        >
          <i class="fa fa-upload" aria-hidden="true"></i>
          &nbsp; Upload Image
        </NavItem>
        <NavItem
          eventKey={2} title="Item"
          disabled={!this.props.processingInProgress}
          onClick={this.save.bind(this)}
        >
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          &nbsp; Save
        </NavItem>
        <NavItem
          eventKey={3}
          disabled={!this.props.processingInProgress}
          onClick={this.undo.bind(this)}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
          &nbsp; Undo
        </NavItem>
        <NavItem
          class="fb-share-button" data-href={this.props.activeImage.url}
          data-layout="button" data-size="small" data-mobile-iframe="true"
          eventKey={4} disabled={this.state.shareIsDisabled}
          onClick={this.handleShare.bind(this)}
        >
          <i class="fa fa-facebook-official" aria-hidden="true"></i>
          &nbsp; Share
        </NavItem>

        <UploadImageModal
          callBackParent={this.onChildChanged.bind(this)}
          childKey="showUploadModal"
          defaultFolderId={this.state.defaultFolderId}
          dispatch={this.props.dispatch}
          folders={this.props.folders}
          token={this.props.token}
          uploadImageErrorStatus={this.props.uploadImageErrorStatus}
          showModal={this.state.showUploadModal}
        />

        <CustomAlert
          callBackParent={this.onChildChanged.bind(this)}
          childKey="uploadAlertVisible"
          spanClass="share-error-alert"
          style="warning"
          title="Error"
          message={uploadAlertMessage}
          showAlert={this.state.uploadAlertVisible}
        />

        <CustomAlert
          callBackParent={this.onChildChanged.bind(this)}
          childKey="shareAlertVisible"
          spanClass="share-error-alert"
          style="danger"
          title="ERROR"
          message={shareAlertMessage}
          showAlert={this.state.shareAlertVisible}
        />

      </Nav>
    );
  }
}

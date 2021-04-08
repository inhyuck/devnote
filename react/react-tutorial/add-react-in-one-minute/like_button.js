'use strict'

const e = React.createElement

class LikeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false }
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    )
  }
}

document.querySelectorAll('.like_button_container').forEach((domContainer) => {
  const commentID = parseInt(domContainer.dataset.commentid, 10)
  ReactDOM.render(e(LikeButton, { commentID }), domContainer)
})

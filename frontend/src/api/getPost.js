import { action } from "../slices/posts"

export const getPostThunk = (dispatch) => async () => {
        fetch('')
        .then(res=> res.json())
        .then((content) => {
          dispatch( action.addPosts(content))
        });
}
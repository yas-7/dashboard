import { connect } from 'react-redux';
import * as actions from '../actions';
import { fetchAuthors } from '../../authors/actions';
import { fetchWebsites } from '../../websites/actions';
import EditForm from '../components/EditForm';

const mapDispatchToProps = {
  addArticle: actions.addArticle,
  updateArticle: actions.updateArticle,
  editArticleFields: actions.editArticleFields,
  fetchAuthors,
  fetchWebsites,
};

function mapStateToProps (state) {
  return {
    currentArticle: state.articlesData.currentArticle,
    authors: state.authorsData.authors,
    websites: state.websitesData.websites,
    authorsError: state.authorsData.error,
    authorsLoading: state.authorsData.loading,
    websitesError: state.websitesData.error,
    websitesLoading: state.websitesData.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);

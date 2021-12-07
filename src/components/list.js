import axios from 'axios';

const url = 'posts';

class ListService {
  static getList() {
    return axios.get(url).then((res) => res.data);
  }

  //Create item
  static insertItem(data) {
    return axios.post(url, {
      data,
    });
  }
}

export default ListService;

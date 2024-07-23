import moment from "moment";
import "moment/locale/pt-br";
export const formatDate = (date: Date) => {
  return moment(date).locale('pt-br').format("MMMM DD, YYYY").toUpperCase();
}
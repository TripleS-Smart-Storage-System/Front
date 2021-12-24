import '../App.css';
import StatisticsForm from '../components/StatisticsForm'
import i18n from '../services/i18n';

const Statistics = () => (
    <div className='statistics'>
      <h1>{i18n.t("Statistics")}</h1>
      <StatisticsForm />
    </div>
);

export default Statistics;
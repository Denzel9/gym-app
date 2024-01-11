import { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'
import Layout from '../../components/Layout/Layout'
import HeaderText from '../../components/ui/HeaderText'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from 'react-native-chart-kit'
import { GOLD, WHITE } from '../../consts/colors'
import { useToast } from 'native-base'

const LastTrainingReport: FunctionComponent<{ route: any }> = ({ route }) => {
  const width = Dimensions.get('window').width
  const height = 220
  console.log(route)
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        data: [50, 20, 2, 86],
        color: (opacity = 1) => `${opacity}, ${opacity})`, // optional
      },
      {
        data: [20, 10, 4, 56],
      },
      {
        data: [30, 90, 67, 54],
      },
    ],
  }

  // Mock data object used for Contribution Graph

  const contributionData = [
    { date: '2016-01-02', count: 1 },
    { date: '2016-01-03', count: 2 },
    { date: '2016-01-04', count: 3 },
    { date: '2016-01-05', count: 4 },
    { date: '2016-01-06', count: 5 },
    { date: '2016-01-30', count: 2 },
    { date: '2016-01-31', count: 3 },
    { date: '2016-03-01', count: 2 },
    { date: '2016-04-02', count: 4 },
    { date: '2016-03-05', count: 2 },
    { date: '2016-02-30', count: 4 },
  ]

  // Mock data object for Pie Chart

  const pieChartData = [
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  // Mock data object for Progress
  const toast = useToast()
  const handleToolTip: any = {}
  const progressChartData = [0.4, 0.6, 0.8]
  return (
    <Layout isScrollView>
      <HeaderText title={'Отчет о последней тренировке'} />
      <Text style={styles.text}>Date {route?.params?.date}</Text>
      <Text style={styles.text}>Line Chart</Text>
      <LineChart
        data={data}
        width={width}
        height={height}
        chartConfig={{
          backgroundGradientToOpacity: 0,
          backgroundGradientFromOpacity: 0,
          fillShadowGradientFrom: GOLD,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        bezier
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
      />
      <Text style={styles.text}>Progress Chart</Text>
      <ProgressChart
        data={progressChartData}
        width={width}
        height={height}
        chartConfig={{
          backgroundGradientToOpacity: 0,
          backgroundGradientFromOpacity: 0,
          fillShadowGradientFrom: GOLD,
          color: (opacity = 1) => `rgba(26, 260, 146, ${opacity})`,
        }}
        style={{ marginVertical: 8, width: '100%' }}
      />
      <Text style={styles.text}>Bar Graph</Text>
      <BarChart
        width={width}
        height={height}
        data={data}
        yAxisSuffix="кг."
        yAxisLabel=""
        chartConfig={{
          backgroundGradientToOpacity: 0,
          backgroundGradientFromOpacity: 0,
          fillShadowGradientFrom: GOLD,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        style={{}}
      />

      <Text style={styles.text}>Contribution Graph</Text>
      <ContributionGraph
        values={contributionData}
        width={width}
        height={height}
        endDate={new Date('2016-05-01')}
        numDays={105}
        chartConfig={{
          backgroundGradientToOpacity: 0,
          backgroundGradientFromOpacity: 0,
          fillShadowGradientFrom: GOLD,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        tooltipDataAttrs={() => handleToolTip}
      />
      <Text style={styles.text}>Pie Chart</Text>
      <PieChart
        paddingLeft="10"
        data={pieChartData}
        height={height}
        width={width}
        backgroundColor="000"
        chartConfig={{
          backgroundGradientToOpacity: 0,
          backgroundGradientFromOpacity: 0,
          fillShadowGradientFrom: GOLD,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        style={{ marginVertical: 8, width: '100%' }}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  text: { color: WHITE, fontSize: 18, paddingTop: 10, paddingBottom: 10 },
})

export default LastTrainingReport

import React, { Component } from 'react';
import { isBefore, isSameDay, isWeekend, addDays, format } from 'date-fns';
import humanInterval from 'human-interval';
import getProxyUrl from '../../../utils/get-proxy-url';
import Widget from '../../../components/Widget';

const DEAFULT_TITLE = 'Sprint Days Remaining';

export default class SprintDaysRemaining extends Component {
  state = {
    daysRemaining: null,
    isLoading: false,
    error: false,
    lastUpdated: null
  };

  getDaysRemaining(days, date, endDate) {
    if (isBefore(date, endDate)) {
      let daysScoped = days;

      if (!isWeekend(date)) {
        daysScoped = ++days;
      }

      return this.getDaysRemaining(daysScoped, addDays(date, 1), endDate);
    } else {
      return days;
    }
  }

  fetchDaysRemaining() {
    this.setState({ isLoading: true });

    const { boardId, url, username, password } = this.props;

    fetch(`${getProxyUrl()}${url}/rest/agile/1.0/board/${boardId}/sprint?state=active`, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        daysRemaining: this.getDaysRemaining(0, new Date(), response.values[0].endDate),
        sprintName: response.values[0].name,
        isLoading: false,
        lastUpdated: format(new Date(), 'HH:mm:ss')
      })
    })
    .catch(error => {
      console.error(error);
      this.setState({ error: true, isLoading: false });
    });
  }

  componentDidMount () {
    this.fetchDaysRemaining();
    window.setInterval(this.fetchDaysRemaining.bind(this), humanInterval('one day'));
  }

  render () {
    const { daysRemaining, sprintName, lastUpdated, isLoading, error } = this.state;
    const { title } = this.props;

    return (
      <Widget title={title || DEAFULT_TITLE} lastUpdated={lastUpdated} loading={isLoading} error={error}>
        <span className="text-large">
          {daysRemaining}
        </span>
        days
      </Widget>
    )
  }
}

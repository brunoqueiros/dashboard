import React, { Component } from 'react';
import humanInterval from 'human-interval';
import { format } from 'date-fns';
import getProxyUrl from '../../../utils/get-proxy-url';
import NumberWidget from '../../../components/NumberWidget';

const DEAFULT_TITLE = 'Sprint Tasks Left';

export default class JiraTasksLeft extends Component {
  state = {
    tasksLeft: null,
    isLoading: false,
    error: false
  };

  getSprintId() {
    const { boardId, url, username, password } = this.props;

    return fetch(`${getProxyUrl()}${url}/rest/agile/1.0/board/${boardId}/sprint?state=active`, {
      headers: { 'Authorization': `Basic ${btoa(`${username}:${password}`)}` }
    })
    .then(response => response.json())
    .then(response => response.values[0].id);
  }

  fetchDaysRemaining() {
    this.setState({ isLoading: true });

    const { url, username, password } = this.props;

    this.getSprintId()
    .then(sprintId => {
      fetch(`${getProxyUrl()}${url}/rest/agile/1.0/sprint/${sprintId}/issue?startAt=0`, {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          tasksLeft: response.issues.filter(issue => !issue.fields.resolutiondate || issue.fields.resolutiondate === 0).length,
          isLoading: false
        });
      });
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
    const { tasksLeft, isLoading, error } = this.state;
    const { title } = this.props;

    return (
      <NumberWidget
        title={title || DEAFULT_TITLE}
        loading={isLoading}
        error={error}
        amount={tasksLeft}
        amountDescription="tasks"
      />
    )
  }
}

import React from 'react';
import { Progress } from './progress';
import { Controls } from './controls';
import { TaskList } from './task-list';

export class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      active: 0,
      tasks: [
        {
          name: 'test',
          time: 0,
          duration: 20 * 60,
          break: 5 * 60,
          amount: 0,
          started: false,
        },
      ],
    };
  }

  handleToggleStartStop() {
    const task = this.getActiveTask();
    if (!task) return;
    if (task.started) {
      clearInterval(this.state.interval);
    } else {
      this.setState(prevState => ({
        ...prevState,
        ...{
          interval: setInterval(() => {
            const task = this.getActiveTask();
            task.time += 1;
            this.updateActiveTask(task);
          }, 1000),
        },
      }));
    }
  }

  getActiveTask() {
    const index = this.state.tasks.findIndex(
      task => task.id === this.state.active,
    );
    if (index) {
      return this.state.tasks[index];
    }
  }

  handleDecrease() {
    this.decreaseIncrease(-60);
  }
  handleIncrease() {
    this.decreaseIncrease(60);
  }
  handleReset() {
    this.decreaseIncrease(null, true);
  }

  decreaseIncrease(value, reset = false) {
    const task = this.getActiveTask();
    if (!task) return;
    if (reset) {
      task.time = task.duration;
    } else {
      task.time += value;
    }
    this.updateActiveTask(task);
  }

  updateActiveTask(task) {
    this.setState(prevState => {
      const state = { ...prevState };
      const tasks = [...this.state.tasks];

      const index = tasks.findIndex(t => t.id === task.id);
      tasks[index] = task;

      state.tasks = tasks;
      return state;
    });
  }

  render() {
    const activeTask = this.getActiveTask();

    return (
      <div>
        <Progress
          onToggleStartStop={() => this.handleToggleStartStop()}
          task={activeTask}
        />
        <Controls
          onDecrease={() => this.handleDecrease()}
          onIncrease={() => this.handleIncrease()}
          onReset={() => this.handleReset()}
          task={activeTask}
        />
        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}

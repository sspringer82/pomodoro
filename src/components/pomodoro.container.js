import React from 'react';
import { Progress } from './progress';
import { Controls } from './controls';
import { TaskList } from './task-list';
import { Footer } from './footer';

const GRANTED = 'granted';

export class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    let permission = false;

    if (window.hasOwnProperty('Notification')) {
      permission = Notification.permissionGranted === GRANTED;
      if (!permission) {
        Notification.requestPermission(permission => {
          this.setState({ notificationPermission: permission === GRANTED });
        });
      }
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));

    this.state = {
      interval: null,
      notificationPermission: false,
      tasks: tasks || [],
    };
  }

  handleToggleStartStop() {
    console.log('handle Toggle Start Stop');
    const task = this.getActiveTask();
    if (!task) return;
    if (task.started) {
      this.stop(task);
    } else {
      this.start(task);
    }
  }

  finish(task) {
    task.amount += 1;
    if (this.state.notificationPermission) {
      new Notification(task.name + ' ended');
    }
    this.stop(task);
  }

  stop(task) {
    console.log('stop');
    this.updateTask({ ...task, started: false });
    clearInterval(this.state.interval);
  }

  start(task) {
    console.log('start');
    this.updateTask({ ...task, started: true });
    this.setState(prevState => ({
      ...prevState,
      ...{
        interval: setInterval(() => {
          const task = this.getActiveTask();
          if (task.time <= 0) {
            this.finish(task);
          } else {
            task.time -= 1;
            this.updateTask(task);
          }
        }, 1000),
      },
    }));
  }

  getActiveTask() {
    return this.state.tasks.find(task => task.active);
  }

  handleDecrease() {
    console.log('decrease');
    this.decreaseIncrease(-60);
  }
  handleIncrease() {
    console.log('increase');
    this.decreaseIncrease(60);
  }
  handleReset() {
    console.log('reset');
    this.decreaseIncrease(null, true);
  }
  handleDelete(task) {
    const index = this.state.tasks.findIndex(t => t.id === task.id);
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState(prev => ({ ...prev, ...{ tasks } }));
    this.storeTasks(tasks);
    if (task.active) {
      this.handleActivate(tasks[0]);
    }
  }

  handleActivate(task) {
    if (!task) {
      return;
    }
    this.setState(prevState => {
      const tasks = prevState.tasks.map(t => {
        const clone = { ...t };
        clone.active = t.id === task.id ? true : false;
        return clone;
      });
      this.storeTasks(tasks);
      return {
        tasks,
      };
    });
  }

  storeTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleCreate(data) {
    if (data.title === '') {
      return;
    }
    this.setState(prevState => {
      const state = { ...prevState };
      const tasks = [...this.state.tasks];

      const nextId =
        tasks.reduce(
          (prev, current) => (prev > current.id ? prev : current.id),
          0,
        ) + 1;

      tasks.push({
        id: nextId,
        name: data.title,
        time: parseInt(data.time * 60, 10),
        duration: parseInt(data.time * 60, 10),
        break: parseInt(data.break * 60, 10),
        amount: 0,
        started: false,
        active: false,
      });

      this.storeTasks(tasks);
      state.tasks = tasks;
      return state;
    });
  }

  decreaseIncrease(value, reset = false) {
    const task = { ...this.getActiveTask() };
    if (!task) return;
    if (reset) {
      task.time = task.duration;
      task.started = false;
      clearInterval(this.state.interval);
    } else {
      if (task.duration + value >= 0 && task.time + value >= 0) {
        task.duration += value;
        task.time += value;
      }
    }
    this.updateTask(task);
  }

  updateTask(task) {
    this.setState(prevState => {
      const state = { ...prevState };
      const tasks = [...this.state.tasks];

      const index = tasks.findIndex(t => t.id === task.id);
      tasks[index] = task;

      state.tasks = tasks;

      localStorage.setItem('tasks', JSON.stringify(tasks));
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
        <TaskList
          tasks={this.state.tasks}
          onDelete={task => this.handleDelete(task)}
          onActivate={task => this.handleActivate(task)}
        />
        <Footer onCreate={data => this.handleCreate(data)} />
      </div>
    );
  }
}

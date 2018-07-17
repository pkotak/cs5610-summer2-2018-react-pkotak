import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
export default class ModuleList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module:{ title : ''},
            modules: []
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModules = this.setModules.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.moduleService = ModuleService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    createModule(){
        console.log(this.state.module);
        this.moduleService.createModule(this.state.courseId, this.state.module)
            .then(() => {
               this.findAllModulesForCourse(this.state.courseId);
            });
    }

    deleteModule(moduleId){
        this.moduleService.deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            });
    }

    titleChanged(event) {
        this.setState({module: {title : event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules
            .map((module) =>
                   <ModuleListItem module={module} title={module.title} key={module.id} delete={this.deleteModule}/>
            );
        return modules;
    }

    render(){
        return(
        <div className="container-fluid">
            <input className="form-control"
                   onChange={this.titleChanged}
                   placeholder="title"/>
            <button onClick={this.createModule} className="btn btn-primary btn-block">
                <i className="fa fa-plus"></i>
            </button>
            <ul className="list-group">
            {this.renderListOfModules()}
            </ul>
        </div>
        );
    }
}
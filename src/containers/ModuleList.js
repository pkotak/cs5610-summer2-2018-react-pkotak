import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import ModuleEditor from '../containers/ModuleEditor';
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class ModuleList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedModule: 0,
            courseId: '',
            module:{ title : ''},
            modules: []
        };

        this.selectModule = this.selectModule.bind(this);
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
        this.setState({selectedModule: 0});
        this.findAllModulesForCourse(newProps.courseId)
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    selectModule(moduleIndex){
        this.setState({selectedModule: moduleIndex});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    createModule(){
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
            .map((module, index) => {
                let active = this.state.selectedModule === index ? 'active' : '';
                return(<ModuleListItem module={module}
                                title={module.title}
                                courseId={this.state.courseId}
                                active={active}
                                key={index}
                                delete={this.deleteModule}
                                select={this.selectModule}
                                position={index}/>);
            });
        return modules;
    }

    render(){
        return(
            <Router>
                <div className='row'>
                    <div className="col-4">
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>
                                        <input className="form-control"
                                               onChange={this.titleChanged}
                                               placeholder="title"/>
                                    </td>
                                    <td>
                                        <button onClick={this.createModule} className="btn btn-primary btn-block">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <ul className="list-group">
                            {this.renderListOfModules()}
                        </ul>
                    </div>
                    <div className='col-8'>
                        <Route path='/course/:courseId/module/:moduleId' component={ModuleEditor}/>
                    </div>
                </div>
            </Router>);
    }
}
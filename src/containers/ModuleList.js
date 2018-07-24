import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import ModuleEditor from '../containers/ModuleEditor';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Route} from 'react-router-dom';

export default class ModuleList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedModule: 0,
            courseId: '',
            module:{ title : ''},
            modules: [],
            searchResultsModule: []
        };

        this.selectModule = this.selectModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModules = this.setModules.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.searchBarChanged = this.searchBarChanged.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
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
        this.setState({modules: modules, searchResultsModule: modules});
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

    searchBarChanged(event){
        var searchText = event.target.value;
        var searchedModules = [];
        this.state.modules
            .map(module => {
                if(module.title.includes(searchText)){
                    searchedModules.push(module);
                }
            });
        this.setState({searchResultsModule: searchedModules})
    }

    confirmDelete = (moduleId) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {this.deleteModule(moduleId)}
                },
                {
                    label: 'No',
                    onClick: () => {console.log('cancel')}
                }
            ]
        })
    }

    renderListOfModules() {
        let modules = this.state.searchResultsModule
            .map((module, index) => {
                let active = this.state.selectedModule === index ? 'active' : '';
                return(<ModuleListItem module={module}
                                title={module.title}
                                courseId={this.state.courseId}
                                active={active}
                                key={index}
                                delete={this.confirmDelete}
                                select={this.selectModule}
                                position={index}/>);
            });
        return (
            <div>
                {modules}
                <div className="input-group mb-3">
                    <input className="form-control"
                           onChange={this.titleChanged}
                           placeholder="Module 1.1"/>
                    <div>
                        <button onClick={this.createModule}
                                className="btn btn-primary btn-block">
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

        );
    }

    render(){
        return(
            <div className='row'>
                <div className="col-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"
                                  id="basic-addon1">
                                 <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <input type="text"
                               className="form-control"
                               onChange={this.searchBarChanged}
                               placeholder="Search"/>
                    </div>
                    <ul className="list-group">
                        {this.renderListOfModules()}
                    </ul>
                </div>
                <div className='col-8'>
                    <Route path='/course/:courseId/module/:moduleId' component={ModuleEditor}/>
                </div>
            </div>);
    }
}
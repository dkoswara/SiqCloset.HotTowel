//jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

describe('Learning tests', function () {
    'use strict';

    describe('simple tests', function() {
        it('should be true', function () {
            expect(true).toBeTruthy();
        });

        it('should be false', function () {
            expect(false).toBeFalsy();
        });
    });
    
    describe('learning Jasmine spies', function () {
	    var bar = {
	        foo: function(name) {
	            return 'my name is ' + name;
	        },
	        bas: function(age) {
	            return age;
	        }
	    };

        beforeEach(function() {
            this.foo = jasmine.createSpy('foo');
            spyOn(bar, 'foo').and.returnValue('I am a spy');

        });

        it('real bar.foo is a spy', function () {
            bar.foo.and.callThrough();
            var ret = bar.foo('denis');
            console.log('Return value is ' + ret);
            expect(bar.foo).toHaveBeenCalledWith('denis');
            expect(ret).toMatch(/denis/);
        });

        it('faked bar.foo is a spy', function () {
            var ret = bar.foo('denis');
            console.log('Return value is ' + ret);
            expect(bar.foo).toHaveBeenCalledWith('denis');
            expect(ret).toMatch(/spy/);
        });

        it('foo should be called', function () {
            this.foo(1, 'w');

            expect(this.foo).toHaveBeenCalled();
            console.log('foo should be called');
        });
    });

    //For SO post - http://stackoverflow.com/questions/23597535/breeze-not-populating-entities-from-navigationproperties
    describe('client side metadata by hand 1', function() {

        var mgr;
        var addType, DATE, DT, helper, ID;
        var serviceName = 'metadataClientSideTest';
        var priorStudyEntityName = 'PriorStudy';
        var patientEntityName = 'Patient';
        var patientResourceName = 'Patients';
        var priorStudyResourceName = 'PriorStudies';

        beforeEach(function() {
            mgr = new breeze.EntityManager(serviceName);
            var store = mgr.metadataStore;
            init(store, serviceName);
            initMetadata();
            createSomeMockData();

            // Initialize the metdataFactory with convenience fns and variables 
            function init(metadataStore, _serviceName) {

                var store = metadataStore; // the metadataStore that we'll be filling

                // namespace of the corresponding classes on the server
                var namespace = 'Model'; // don't really need it here 

                // 'Identity' is the default key generation strategy for this app
                var keyGen = breeze.AutoGeneratedKeyType.Identity;

                // Breeze Labs: breeze.metadata.helper.js
                // https://github.com/IdeaBlade/Breeze/blob/master/Breeze.Client/Scripts/Labs/breeze.metadata-helper.js
                // The helper reduces data entry by applying common conventions
                // and converting common abbreviations (e.g., 'type' -> 'dataType')
                helper = new breeze.config.MetadataHelper(namespace, keyGen);
                helper.addDataService(store, _serviceName);

                // addType - make it easy to add the type to the store using the helper
                addType = function (type) { return helper.addTypeToStore(store, type); };

                // DataTypes we'll be using
                DT = breeze.DataType;
                DATE = DT.DateTime;
                ID = DT.Int32;
            }

            function initMetadata() {
                helper.addTypeToStore(mgr.metadataStore, {
                    name: priorStudyEntityName,
                    dataProperties: {
                        priorStudyId: { type: breeze.DataType.Int32 },
                        patientId: { type: breeze.DataType.Int32 },
                        priorStudyType: { max: 6 },
                        priorStudyPurpose: { max: 12 },
                        notes: { max: 250 }
                    },

                    navigationProperties: {
                        patient: patientEntityName,
                    }
                });

                helper.addTypeToStore(mgr.metadataStore, {
                    name: patientEntityName,
                    dataProperties: {
                        patientId: { type: breeze.DataType.Int32 },
                        firstName: { max: 25 },
                        lastName: { max: 25 },
                    },
                    navigationProperties: {
                        priorStudies: { entityTypeName: priorStudyEntityName, hasMany: true }
                    }
                });
            }

            function createSomeMockData() {
                var patientInits = {
                    patientId: 1,
                    firstName: 'Denis',
                    lastName: 'Koswara',
                };
                var patient = mgr.createEntity(patientEntityName, patientInits);
                
                var priorStudyInits = {
                    priorStudyId: 2,
                    priorStudyType: 'DK',
                    priorStudyPurpose: 'Testing',
                    notes: 'Do not forget',
                };
                var priorStudy = mgr.createEntity(priorStudyEntityName, priorStudyInits);
                patient.priorStudies.push(priorStudy);
                mgr.attachEntity(patient);
                //mgr.attachEntity(priorStudy);
            }

        });

        it('should define the following properly', function () {
            var query = breeze.EntityQuery.from('Patients').toType('Patient');

            var results = mgr.executeQueryLocally(query);
            var patient = results[0];
            var priorStudy = patient.priorStudies[0];

            expect(priorStudy).toBeDefined();
            expect(priorStudy.priorStudyId).toEqual(2);
            expect(priorStudy.priorStudyType).toEqual('DK');
            expect(priorStudy.patient.firstName).toEqual('Denis');

        });
    });

    //For SO post - http://stackoverflow.com/questions/23656602/fetch-entities-with-0-junction-tables
    describe('client side metadata by hand 2', function () {

        var mgr;
        var addType;
        var helper;
        var serviceName = '<no_server>';

        var studentEntityName = 'Student';
        var homeworkEntityName = 'Homework';
        var taskEntityName = 'Task';
        var studentTaskEntityName = 'StudentTask';

        var studentResourceName = 'Students';
        var homeworkResourceName = 'Homeworks';
        var taskResourceName = 'Tasks';
        var studentTaskResourceName = 'StudentTasks';

        beforeEach(function () {
            mgr = new breeze.EntityManager(serviceName);
            var store = mgr.metadataStore;
            init(store, serviceName);
            initMetadata();
            createSomeMockData();

            // Initialize the metadataFactory with convenience fns and variables 
            function init(metadataStore, _serviceName) {

                var store = metadataStore; // the metadataStore that we'll be filling

                // namespace of the corresponding classes on the server
                var namespace = 'Model'; // don't really need it here 

                // 'Identity' is the default key generation strategy for this app
                var keyGen = breeze.AutoGeneratedKeyType.Identity;

                // Breeze Labs: breeze.metadata.helper.js
                // https://github.com/IdeaBlade/Breeze/blob/master/Breeze.Client/Scripts/Labs/breeze.metadata-helper.js
                // The helper reduces data entry by applying common conventions
                // and converting common abbreviations (e.g., 'type' -> 'dataType')
                helper = new breeze.config.MetadataHelper(namespace, keyGen);
                helper.addDataService(store, _serviceName);

                // addType - make it easy to add the type to the store using the helper
                addType = function (type) { return helper.addTypeToStore(store, type); };
            }

            function initMetadata() {
                helper.addTypeToStore(mgr.metadataStore, {
                    name: studentEntityName,
                    dataProperties: {
                        id: { type: breeze.DataType.Guid },
                        name: { max: 250 }
                    },

                    navigationProperties: {
                        studentTasks: { entityTypeName: studentTaskEntityName, hasMany: true }
                    }
                });

                helper.addTypeToStore(mgr.metadataStore, {
                    name: homeworkEntityName,
                    dataProperties: {
                        id: { type: breeze.DataType.Guid },
                        description: { max: 250 },
                    },
                    navigationProperties: {
                        tasks: { entityTypeName: taskEntityName, hasMany: true }
                    }
                });

                helper.addTypeToStore(mgr.metadataStore, {
                    name: taskEntityName,
                    dataProperties: {
                        id: { type: breeze.DataType.Guid },
                        homeworkId: { type: breeze.DataType.Guid },
                        description: { max: 250 },
                    },
                    navigationProperties: {
                        homework: 'Homework',
                        studentTasks: { entityTypeName: studentTaskEntityName, hasMany: true }
                    }
                });

                helper.addTypeToStore(mgr.metadataStore, {
                    name: studentTaskEntityName,
                    dataProperties: {
                        id: { type: breeze.DataType.Guid },
                        taskId: { type: breeze.DataType.Guid },
                        studentId: { type: breeze.DataType.Guid },
                    },
                    navigationProperties: {
                        task: taskEntityName,
                        student: studentEntityName
                    }
                });
            }

            function createSomeMockData() {
                var studentInits = {
                    id: breeze.core.getUuid(),
                    name: 'Thor',
                };
                var student = createEntityCore(studentEntityName, studentInits);

                var studentInits2 = {
                    id: breeze.core.getUuid(),
                    name: 'Captain America',
                };
                var student2 = createEntityCore(studentEntityName, studentInits2);

                var homeworkInits = {
                    id: breeze.core.getUuid(),
                    description: 'Math',
                };
                var homework = createEntityCore(homeworkEntityName, homeworkInits);

                var taskInits = {
                    id: breeze.core.getUuid(),
                    description: 'Calculus',
                };
                var task = createEntityCore(taskEntityName, taskInits);

                //Include this task in a homework
                homework.tasks.push(task);

                //Assign this task to a student
                assignTaskToStudent(task, student);

                function assignTaskToStudent(_task, _student) {
                    var studentTaskInits = {
                        id: breeze.core.getUuid(),
                    };
                    var studentTask = createEntityCore(studentTaskEntityName, studentTaskInits);
                    studentTask.task = _task;
                    studentTask.student = _student;
                }

                function createEntityCore(entityName, inits) {
                    var entity = mgr.createEntity(entityName, inits);
                    mgr.attachEntity(entity);
                    return entity;
                }
            }

        });

        it('should define the following properly', function () {
            var query = breeze.EntityQuery.from(studentResourceName);

            var results = mgr.executeQueryLocally(query);
            var student = results[0];

            expect(student).toBeDefined();
            expect(student.name).toEqual('Thor');
            console.log(student.name);

            expect(student.studentTasks.length).toEqual(1);
            console.log(student.studentTasks.length);

            var task = student.studentTasks[0].task;
            expect(task.description).toEqual('Calculus');
            console.log(task.description);

            var homework = task.homework;
            expect(homework.description).toEqual('Math');
            console.log(homework.description);

            var idToFind = homework.id;
            var r0 = findStudent(idToFind);
            console.log(r0.length);

            var p = breeze.Predicate.create("studentTasks", "any", "id", "!=", null).not();
            var q0 = breeze.EntityQuery.from(studentResourceName).where(p);
            var r1 = mgr.executeQueryLocally(q0);
            console.log(r1[0].name);
        });

        function findStudent(homeworkId, taskCount) {
            var query = breeze.EntityQuery.from(studentResourceName)
                        .where('studentTasks', 'any', 'task.homeworkId', '==', homeworkId);

            return mgr.executeQueryLocally(query);
        }
    });

    //To learn the difference between Factory vs Service vs Provider
    describe('understanding factory vs service vs provider', function() {
        
        (function () {
            function Coffee(sugarType) {
                this.sugar = sugarType;
            }

            var theCoffee = angular.module('theCoffee', []);

            theCoffee.value('sugar', 'white');
            theCoffee.value('brownSugar', 'brown');
            theCoffee.value('caneSugar', 'cane');

            //Factory recipe
            theCoffee.factory('coffeeFactory', ['sugar', coffeeFactoryFunc]);
            function coffeeFactoryFunc(sugarType) {
                return new Coffee(sugarType);
            }

            //Service recipe
            theCoffee.service('coffeeService', ['brownSugar', Coffee]);

            //Provider recipe
            theCoffee.provider('coffeeProvider', coffeeProviderFunc);
            function coffeeProviderFunc() {
                this.$get = ['caneSugar', getter];

                function getter(sugar) {
                    return new Coffee(sugar);
                }
            }


        })(angular);

        beforeEach(function() {
            angular.mock.module('theCoffee');
        });

        it('should create Coffee using factory', inject(function(coffeeFactory) {
            expect(coffeeFactory.sugar).toEqual('white');
        }));

        it('should create Coffee using service', inject(function (coffeeService) {
            expect(coffeeService.sugar).toEqual('brown');
        }));

        it('should create Coffee using provider', inject(function (coffeeProvider) {
            expect(coffeeProvider.sugar).toEqual('cane');
        }));

    });
});
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/topics": {
    get: operations["getAllTopicsByCourseId"];
    put: operations["updateTopic"];
    post: operations["createTopic"];
  };
  "/exercises/{exerciseId}/run": {
    put: operations["runCode"];
  };
  "/exercises/code": {
    put: operations["updateCodeExercise"];
    post: operations["createCodeExercise"];
  };
  "/users": {
    get: operations["getAllUsers"];
    post: operations["createUser"];
    patch: operations["updateById"];
  };
  "/users/import-users": {
    post: operations["importUsersByExcel"];
  };
  "/topics/view": {
    get: operations["getPublicGroups"];
    post: operations["addViewPermission"];
    delete: operations["removeViewPermission"];
  };
  "/group": {
    get: operations["getAllGroups"];
    post: operations["createGroup"];
  };
  "/exercises/{exerciseId}/submit": {
    post: operations["submitCodeExercise"];
  };
  "/exercises/{exerciseId}/check-key": {
    post: operations["checkCodeExerciseKey"];
  };
  "/courses": {
    get: operations["getAll"];
    post: operations["createOne"];
    patch: operations["updateById_1"];
  };
  "/courses/student": {
    post: operations["addStudentToCourse"];
    delete: operations["deleteById_2"];
  };
  "/courses/import-students": {
    post: operations["addStudentsToCourse"];
  };
  "/courses/import-courses": {
    post: operations["importCoursesByExcel"];
  };
  "/users/{userId}": {
    get: operations["getById"];
    delete: operations["deleteById"];
  };
  "/topics/{topicId}": {
    get: operations["getTopic"];
    delete: operations["deleteTopic"];
  };
  "/group/{groupId}": {
    get: operations["getGroupById"];
    delete: operations["deleteGroup"];
  };
  "/group/get-groups-in-course/{courseId}": {
    get: operations["getGroupsByCourseId"];
  };
  "/exercises": {
    get: operations["getAllExerciseByCourseId"];
    delete: operations["deleteExerciseById"];
  };
  "/courses/{courseId}": {
    get: operations["getById_1"];
    delete: operations["deleteById_1"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    UpdateTopicRequest: {
      topicId: string;
      topicName?: string;
      description?: string;
    };
    IOTestCase: {
      value: string;
      dataType: string;
    };
    RunCodeRequest: {
      containerId?: string;
      contentFile?: string;
      fileName?: string;
      inputs?: components["schemas"]["IOTestCase"][];
    };
    CodeExercise: {
      exerciseId?: string;
      topicId: string;
      exerciseName: string;
      key: string;
      createdDate?: string;
      updatedDate?: string;
      /** Format: date-time */
      startTime: string;
      /** Format: date-time */
      endTime: string;
      type: string;
      publicGroupIds: string[];
      language: string;
      functionName: string;
      template: string;
      description: string;
      testcases: string[];
    };
    CreateUserRequest: {
      name: string;
      email: string;
      username: string;
      role: string;
    };
    CreateTopicRequest: {
      courseId: string;
      topicName: string;
      description?: string;
    };
    CreateGroupRequest: {
      courseId: string;
      groupName: string;
    };
    SubmitCodeRequest: {
      containerId?: string;
    };
    CreateCodeExerciseRequest: {
      topicId: string;
      exerciseName: string;
      key: string;
      /** Format: date-time */
      startTime: string;
      /** Format: date-time */
      endTime: string;
      type: string;
      publicGroupIds: string[];
      language: string;
      functionName: string;
      template: string;
      description: string;
      testcases: components["schemas"]["TestCase"][];
    };
    TestCase: {
      testcaseId?: string;
      inputs: components["schemas"]["IOTestCase"][];
      output: components["schemas"]["IOTestCase"];
    };
    CreateCourseRequest: {
      courseName: string;
      semester?: string;
      description?: string;
    };
    AddStudentToCourseRequest: {
      studentId: string;
      courseId: string;
    };
    ImportStudentToCourseRequest: {
      courseId: string;
      /** Format: binary */
      file: string;
    };
    UpdateUserRequest: {
      userId: string;
      updatedName?: string;
      updatedEmail?: string;
      updatedUsername?: string;
      updatedPassword?: string;
      updatedRole?: string;
      /** Format: date-time */
      createdDate?: string;
    };
    UpdateCourseRequest: {
      courseId: string;
      courseName?: string;
      semester?: string;
      description?: string;
    };
    GetUsersRequest: {
      role?: string;
      searchKeyword?: string;
      /** Format: int32 */
      pageNumber?: number;
      /** Format: int32 */
      pageSize?: number;
      pageable?: components["schemas"]["PageableObject"];
    };
    PageableObject: {
      /** Format: int64 */
      offset?: number;
      sort?: components["schemas"]["SortObject"];
      paged?: boolean;
      unpaged?: boolean;
      /** Format: int32 */
      pageNumber?: number;
      /** Format: int32 */
      pageSize?: number;
    };
    SortObject: {
      empty?: boolean;
      unsorted?: boolean;
      sorted?: boolean;
    };
    DeleteExerciseRequest: {
      exerciseId: string;
      type: string;
    };
    RemoveStudentFromCourseRequest: {
      studentId: string;
      courseId: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  getAllTopicsByCourseId: {
    parameters: {
      query: {
        courseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  updateTopic: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UpdateTopicRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  createTopic: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["CreateTopicRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  runCode: {
    parameters: {
      path: {
        exerciseId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RunCodeRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  updateCodeExercise: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CodeExercise"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  createCodeExercise: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateCodeExerciseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getAllUsers: {
    parameters: {
      query: {
        getUsersRequest: components["schemas"]["GetUsersRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  createUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  updateById: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  importUsersByExcel: {
    requestBody?: {
      content: {
        "application/json": {
          /** Format: binary */
          file: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getPublicGroups: {
    parameters: {
      query: {
        topicId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  addViewPermission: {
    parameters: {
      query: {
        topicId: string;
        groupIds: string[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  removeViewPermission: {
    parameters: {
      query: {
        topicId: string;
        groupIds: string[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getAllGroups: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  createGroup: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateGroupRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  submitCodeExercise: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SubmitCodeRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  checkCodeExerciseKey: {
    parameters: {
      path: {
        exerciseId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getAll: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  createOne: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateCourseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  updateById_1: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateCourseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  addStudentToCourse: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddStudentToCourseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  deleteById_2: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RemoveStudentFromCourseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  addStudentsToCourse: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["ImportStudentToCourseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  importCoursesByExcel: {
    requestBody?: {
      content: {
        "application/json": {
          /** Format: binary */
          file: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getById: {
    parameters: {
      path: {
        userId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  deleteById: {
    parameters: {
      path: {
        userId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getTopic: {
    parameters: {
      path: {
        topicId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  deleteTopic: {
    parameters: {
      path: {
        topicId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getGroupById: {
    parameters: {
      path: {
        groupId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  deleteGroup: {
    parameters: {
      query: {
        groupId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getGroupsByCourseId: {
    parameters: {
      path: {
        courseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getAllExerciseByCourseId: {
    parameters: {
      query: {
        courseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  deleteExerciseById: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["DeleteExerciseRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  getById_1: {
    parameters: {
      path: {
        courseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  deleteById_1: {
    parameters: {
      path: {
        courseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
}

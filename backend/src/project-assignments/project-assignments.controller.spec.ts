import { Test, TestingModule } from '@nestjs/testing';
import { ProjectAssignmentsController } from './project-assignments.controller';

describe('ProjectAssignmentsController', () => {
  let controller: ProjectAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectAssignmentsController],
    }).compile();

    controller = module.get<ProjectAssignmentsController>(ProjectAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProjectAssignmentsService } from './project-assignments.service';

describe('ProjectAssignmentsService', () => {
  let service: ProjectAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectAssignmentsService],
    }).compile();

    service = module.get<ProjectAssignmentsService>(ProjectAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

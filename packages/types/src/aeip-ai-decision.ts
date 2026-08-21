export enum DecisionType {
  STRATEGIC = 'STRATEGIC',
  TACTICAL = 'TACTICAL',
  OPERATIONAL = 'OPERATIONAL',
  FINANCIAL = 'FINANCIAL',
  ACADEMIC = 'ACADEMIC',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  TECHNOLOGY = 'TECHNOLOGY',
  MARKETING = 'MARKETING',
  COMPLIANCE = 'COMPLIANCE',
  RISK = 'RISK'
}

export enum DecisionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IMPLEMENTED = 'IMPLEMENTED',
  MONITORED = 'MONITORED',
  REVISED = 'REVISED',
  CANCELLED = 'CANCELLED',
  DEFERRED = 'DEFERRED',
  ARCHIVED = 'ARCHIVED'
}

export enum DecisionPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  BACKGROUND = 'BACKGROUND'
}

export enum RuleType {
  BUSINESS = 'BUSINESS',
  VALIDATION = 'VALIDATION',
  COMPUTATION = 'COMPUTATION',
  WORKFLOW = 'WORKFLOW',
  SECURITY = 'SECURITY',
  COMPLIANCE = 'COMPLIANCE',
  OPTIMIZATION = 'OPTIMIZATION',
  PREDICTIVE = 'PREDICTIVE',
  ADAPTIVE = 'ADAPTIVE',
  CUSTOM = 'CUSTOM'
}

export enum RuleCondition {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_OR_EQUAL = 'GREATER_OR_EQUAL',
  LESS_OR_EQUAL = 'LESS_OR_EQUAL',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  MATCHES = 'MATCHES',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  BETWEEN = 'BETWEEN',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  CUSTOM = 'CUSTOM'
}

export enum PolicyScope {
  GLOBAL = 'GLOBAL',
  TENANT = 'TENANT',
  SCHOOL = 'SCHOOL',
  DEPARTMENT = 'DEPARTMENT',
  CLASS = 'CLASS',
  USER = 'USER',
  ROLE = 'ROLE',
  SESSION = 'SESSION',
  REQUEST = 'REQUEST',
  CUSTOM = 'CUSTOM'
}

export enum OptimizationGoal {
  MINIMIZE = 'MINIMIZE',
  MAXIMIZE = 'MAXIMIZE',
  BALANCE = 'BALANCE',
  SATISFY = 'SATISFY',
  OPTIMIZE = 'OPTIMIZE',
  EFFICIENCY = 'EFFICIENCY',
  COST = 'COST',
  TIME = 'TIME',
  QUALITY = 'QUALITY',
  SATISFACTION = 'SATISFACTION'
}

export enum ConstraintType {
  HARD = 'HARD',
  SOFT = 'SOFT',
  PREFERENCE = 'PREFERENCE',
  WEIGHTED = 'WEIGHTED',
  PRIORITY = 'PRIORITY',
  TEMPORAL = 'TEMPORAL',
  SPATIAL = 'SPATIAL',
  RESOURCE = 'RESOURCE',
  LOGICAL = 'LOGICAL',
  CUSTOM = 'CUSTOM'
}

export enum ScenarioType {
  BEST_CASE = 'BEST_CASE',
  WORST_CASE = 'WORST_CASE',
  BASE_CASE = 'BASE_CASE',
  WHAT_IF = 'WHAT_IF',
  SENSITIVITY = 'SENSITIVITY',
  MONTE_CARLO = 'MONTE_CARLO',
  STRESS_TEST = 'STRESS_TEST',
  HISTORICAL = 'HISTORICAL',
  PREDICTIVE = 'PREDICTIVE',
  CUSTOM = 'CUSTOM'
}

export enum AnalysisType {
  DESCRIPTIVE = 'DESCRIPTIVE',
  DIAGNOSTIC = 'DIAGNOSTIC',
  PREDICTIVE = 'PREDICTIVE',
  PRESCRIPTIVE = 'PRESCRIPTIVE',
  ROOT_CAUSE = 'ROOT_CAUSE',
  IMPACT = 'IMPACT',
  TREND = 'TREND',
  COMPARATIVE = 'COMPARATIVE',
  CORRELATION = 'CORRELATION',
  REGRESSION = 'REGRESSION'
}

export enum ExplainabilityLevel {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  COMPREHENSIVE = 'COMPREHENSIVE',
  INTERACTIVE = 'INTERACTIVE',
  VISUAL = 'VISUAL',
  NATURAL_LANGUAGE = 'NATURAL_LANGUAGE',
  TECHNICAL = 'TECHNICAL',
  CUSTOM = 'CUSTOM'
}

export enum ReinforcementAction {
  EXPLORE = 'EXPLOIT',
  EXPLOIT = 'EXPLOIT',
  BALANCE = 'BALANCE',
  ADAPTIVE = 'ADAPTIVE',
  GREEDY = 'GREEDY',
  EPSILON_GREEDY = 'EPSILON_GREEDY',
  UCB = 'UCB',
  THOMPSON_SAMPLING = 'THOMPSON_SAMPLING',
  BANDIT = 'BANDIT',
  Q_LEARNING = 'Q_LEARNING'
}

export enum GraphNodeType {
  DECISION = 'DECISION',
  CHANCE = 'CHANCE',
  END = 'END',
  START = 'START',
  CONDITION = 'CONDITION',
  ACTION = 'ACTION',
  OUTCOME = 'OUTCOME',
  UTILITY = 'UTILITY',
  INFORMATION = 'INFORMATION',
  TRANSFER = 'TRANSFER'
}

export enum GraphEdgeType {
  PROBABILITY = 'PROBABILITY',
  DETERMINISTIC = 'DETERMINISTIC',
  CONDITIONAL = 'CONDITIONAL',
  TEMPORAL = 'TEMPORAL',
  CAUSAL = 'CAUSAL',
  INFORMATIONAL = 'INFORMATIONAL',
  PREFERENCE = 'PREFERENCE',
  CONSTRAINT = 'CONSTRAINT',
  UTILITY = 'UTILITY',
  CUSTOM = 'CUSTOM'
}

export enum RuleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
  TESTING = 'TESTING',
  DEPRECATED = 'DEPRECATED',
  ARCHIVED = 'ARCHIVED',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
  LOCKED = 'LOCKED'
}

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
  TESTING = 'TESTING',
  DEPRECATED = 'DEPRECATED',
  ARCHIVED = 'ARCHIVED',
  PENDING = 'PENDING',
  ENFORCING = 'ENFORCING',
  MONITORING = 'MONITORING',
  VIOLATED = 'VIOLATED'
}

export enum OptimizationStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  CONVERGED = 'CONVERGED',
  FAILED = 'FAILED',
  TIMEOUT = 'TIMEOUT',
  FEASIBLE = 'FEASIBLE',
  INFEASIBLE = 'INFEASIBLE',
  UNBOUNDED = 'UNBOUNDED',
  OPTIMAL = 'OPTIMAL',
  FEASIBLE_FOUND = 'FEASIBLE_FOUND'
}

export enum ConstraintViolationType {
  HARD = 'HARD',
  SOFT = 'SOFT',
  BOUNDS = 'BOUNDS',
  RESOURCE = 'RESOURCE',
  TEMPORAL = 'TEMPORAL',
  SPATIAL = 'SPATIAL',
  LOGICAL = 'LOGICAL',
  PREFERENCE = 'PREFERENCE',
  CUSTOM = 'CUSTOM',
  CRITICAL = 'CRITICAL'
}

export enum ScenarioStatus {
  DRAFT = 'DRAFT',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  VALIDATED = 'VALIDATED',
  ARCHIVED = 'ARCHIVED',
  COMPARED = 'COMPARED',
  RECOMMENDED = 'RECOMMENDED',
  DEPRECATED = 'DEPRECATED'
}

export enum ExplanationType {
  FEATURE_IMPORTANCE = 'FEATURE_IMPORTANCE',
  RULE_EXPLANATION = 'RULE_EXPLANATION',
  DECISION_PATH = 'DECISION_PATH',
  COUNTERFACTUAL = 'COUNTERFACTUAL',
  SIMILAR_CASES = 'SIMILAR_CASES',
  PROBABILISTIC = 'PROBABILISTIC',
  CAUSAL = 'CAUSAL',
  CONTRASTIVE = 'CONTRASTIVE',
  RETROSPECTIVE = 'RETROSPECTIVE',
  NATURAL_LANGUAGE = 'NATURAL_LANGUAGE'
}

export enum ReinforcementStatus {
  IDLE = 'IDLE',
  TRAINING = 'TRAINING',
  EVALUATING = 'EVALUATING',
  DEPLOYED = 'DEPLOYED',
  EXPLORING = 'EXPLORING',
  EXPLOITING = 'EXPLOITING',
  CONVERGED = 'CONVERGED',
  DIVERGED = 'DIVERGED',
  PAUSED = 'PAUSED',
  TERMINATED = 'TERMINATED'
}

export enum DecisionAuditAction {
  CREATED = 'CREATED',
  MODIFIED = 'MODIFIED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IMPLEMENTED = 'IMPLEMENTED',
  MONITORED = 'MONITORED',
  REVISED = 'REVISED',
  CANCELLED = 'CANCELLED',
  EXPORTED = 'EXPORTED',
  ARCHIVED = 'ARCHIVED'
}

export enum MetricType {
  COUNTER = 'COUNTER',
  GAUGE = 'GAUGE',
  HISTOGRAM = 'HISTOGRAM',
  SUMMARY = 'SUMMARY',
  RATE = 'RATE',
  PERCENTAGE = 'PERCENTAGE',
  RATIO = 'RATIO',
  DURATION = 'DURATION',
  SIZE = 'SIZE',
  CUSTOM = 'CUSTOM'
}

export enum AggregationType {
  SUM = 'SUM',
  AVERAGE = 'AVERAGE',
  MIN = 'MIN',
  MAX = 'MAX',
  COUNT = 'COUNT',
  MEDIAN = 'MEDIAN',
  PERCENTILE = 'PERCENTILE',
  VARIANCE = 'VARIANCE',
  STANDARD_DEVIATION = 'STANDARD_DEVIATION',
  RATE = 'RATE'
}

export interface DecisionGraph {
  id: string;
  name: string;
  description: string;
  nodes: DecisionNode[];
  edges: DecisionEdge[];
  metadata: Record<string, unknown>;
}

export interface DecisionNode {
  id: string;
  graphId: string;
  type: GraphNodeType;
  name: string;
  description: string;
  position: Record<string, number>;
  properties: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface DecisionEdge {
  id: string;
  graphId: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: GraphEdgeType;
  label: string;
  weight: number;
  probability?: number;
  condition?: string;
  metadata: Record<string, unknown>;
}

export interface DecisionRule {
  id: string;
  name: string;
  description: string;
  type: RuleType;
  status: RuleStatus;
  priority: number;
  conditions: DecisionRuleCondition[];
  actions: DecisionRuleAction[];
  effectiveFrom: string;
  effectiveUntil?: string;
  version: number;
  metadata: Record<string, unknown>;
}

export interface DecisionRuleCondition {
  id: string;
  ruleId: string;
  field: string;
  operator: RuleCondition;
  value: unknown;
  logicOperator?: string;
  group?: string;
  metadata: Record<string, unknown>;
}

export interface DecisionRuleAction {
  id: string;
  ruleId: string;
  type: string;
  target: string;
  parameters: Record<string, unknown>;
  order: number;
  metadata: Record<string, unknown>;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  scope: PolicyScope;
  status: PolicyStatus;
  rules: PolicyRule[];
  enforcementLevel: string;
  effectiveFrom: string;
  effectiveUntil?: string;
  version: number;
  metadata: Record<string, unknown>;
}

export interface PolicyRule {
  id: string;
  policyId: string;
  name: string;
  description: string;
  conditions: PolicyRuleCondition[];
  actions: PolicyRuleAction[];
  priority: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface PolicyRuleCondition {
  id: string;
  ruleId: string;
  field: string;
  operator: RuleCondition;
  value: unknown;
  logicOperator?: string;
  metadata: Record<string, unknown>;
}

export interface PolicyRuleAction {
  id: string;
  ruleId: string;
  type: string;
  target: string;
  parameters: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface OptimizationProblem {
  id: string;
  name: string;
  description: string;
  objective: OptimizationGoal;
  variables: OptimizationVariable[];
  constraints: OptimizationConstraint[];
  parameters: Record<string, unknown>;
  status: OptimizationStatus;
  metadata: Record<string, unknown>;
}

export interface OptimizationVariable {
  id: string;
  problemId: string;
  name: string;
  type: string;
  lowerBound?: number;
  upperBound?: number;
  initialValue?: number;
  continuous: boolean;
  metadata: Record<string, unknown>;
}

export interface OptimizationConstraint {
  id: string;
  problemId: string;
  type: ConstraintType;
  name: string;
  expression: string;
  lowerBound?: number;
  upperBound?: number;
  weight: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface OptimizationSolution {
  id: string;
  problemId: string;
  variables: Record<string, number>;
  objectiveValue: number;
  feasible: boolean;
  iterations: number;
  solveTime: number;
  algorithm: string;
  status: OptimizationStatus;
  metadata: Record<string, unknown>;
}

export interface Constraint {
  id: string;
  name: string;
  description: string;
  type: ConstraintType;
  expression: string;
  lowerBound?: number;
  upperBound?: number;
  weight: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface ConstraintViolation {
  id: string;
  constraintId: string;
  type: ConstraintViolationType;
  severity: string;
  description: string;
  actualValue: number;
  expectedValue: number;
  deviation: number;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
  metadata: Record<string, unknown>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  type: ScenarioType;
  parameters: Record<string, unknown>;
  assumptions: string[];
  results?: ScenarioResult;
  status: ScenarioStatus;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface ScenarioResult {
  id: string;
  scenarioId: string;
  metrics: Record<string, number>;
  outcomes: Record<string, unknown>;
  confidence: number;
  sensitivity: Record<string, number>;
  risks: ScenarioRisk[];
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export interface ScenarioRisk {
  id: string;
  resultId: string;
  type: string;
  probability: number;
  impact: number;
  score: number;
  mitigation: string;
  metadata: Record<string, unknown>;
}

export interface WhatIfAnalysis {
  id: string;
  name: string;
  description: string;
  baseScenario: string;
  variables: WhatIfVariable[];
  results: WhatIfResult[];
  status: string;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface WhatIfVariable {
  id: string;
  analysisId: string;
  name: string;
  baseValue: number;
  testValues: number[];
  impact: number;
  metadata: Record<string, unknown>;
}

export interface WhatIfResult {
  id: string;
  analysisId: string;
  variableId: string;
  testValue: number;
  outcome: Record<string, number>;
  sensitivity: number;
  metadata: Record<string, unknown>;
}

export interface ExplainableDecision {
  id: string;
  decisionId: string;
  level: ExplainabilityLevel;
  explanation: string;
  factors: ExplainableFactor[];
  confidence: number;
  alternatives: ExplainableAlternative[];
  counterfactuals: Counterfactual[];
  metadata: Record<string, unknown>;
}

export interface ExplainableFactor {
  id: string;
  decisionId: string;
  name: string;
  importance: number;
  direction: string;
  value: unknown;
  description: string;
  contribution: number;
  metadata: Record<string, unknown>;
}

export interface ExplainableAlternative {
  id: string;
  decisionId: string;
  description: string;
  probability: number;
  impact: number;
  feasibility: number;
  expectedOutcome: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface Counterfactual {
  id: string;
  decisionId: string;
  description: string;
  changes: Record<string, unknown>;
  outcome: Record<string, unknown>;
  feasibility: number;
  distance: number;
  metadata: Record<string, unknown>;
}

export interface DecisionAudit {
  id: string;
  decisionId: string;
  action: DecisionAuditAction;
  actor: string;
  timestamp: string;
  details: Record<string, unknown>;
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface ReinforcementModel {
  id: string;
  name: string;
  description: string;
  algorithm: string;
  status: ReinforcementStatus;
  hyperparameters: Record<string, unknown>;
  metrics: ReinforcementMetrics;
  policy: ReinforcementPolicy;
  experience: ReinforcementExperience[];
  metadata: Record<string, unknown>;
}

export interface ReinforcementMetrics {
  id: string;
  modelId: string;
  episodes: number;
  averageReward: number;
  totalReward: number;
  convergenceRate: number;
  explorationRate: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface ReinforcementPolicy {
  id: string;
  modelId: string;
  type: string;
  parameters: Record<string, unknown>;
  version: number;
  effectiveFrom: string;
  metadata: Record<string, unknown>;
}

export interface ReinforcementExperience {
  id: string;
  modelId: string;
  state: Record<string, unknown>;
  action: string;
  reward: number;
  nextState: Record<string, unknown>;
  done: boolean;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface DecisionMetrics {
  id: string;
  decisionId: string;
  metrics: Record<string, DecisionMetric>;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface DecisionMetric {
  name: string;
  value: number;
  unit: string;
  type: MetricType;
  aggregation: AggregationType;
  metadata: Record<string, unknown>;
}

export interface Decision {
  id: string;
  name: string;
  description: string;
  type: DecisionType;
  status: DecisionStatus;
  priority: DecisionPriority;
  graph?: DecisionGraph;
  rules: DecisionRule[];
  policies: Policy[];
  optimization?: OptimizationProblem;
  scenarios: Scenario[];
  explainability?: ExplainableDecision;
  audit: DecisionAudit[];
  metrics: DecisionMetrics;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export interface DecisionNode2 {
  id: string;
  type: GraphNodeType;
  name: string;
  description: string;
  properties: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface DecisionEdge2 {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: GraphEdgeType;
  label: string;
  weight: number;
  probability?: number;
  condition?: string;
  metadata: Record<string, unknown>;
}

export interface DecisionTree {
  id: string;
  name: string;
  description: string;
  root: DecisionTreeNode;
  metadata: Record<string, unknown>;
}

export interface DecisionTreeNode {
  id: string;
  treeId: string;
  parentId?: string;
  type: GraphNodeType;
  name: string;
  condition?: string;
  value?: unknown;
  children: DecisionTreeNode[];
  metadata: Record<string, unknown>;
}

export interface BayesianNetwork {
  id: string;
  name: string;
  description: string;
  nodes: BayesianNode[];
  edges: BayesianEdge[];
  metadata: Record<string, unknown>;
}

export interface BayesianNode {
  id: string;
  networkId: string;
  name: string;
  states: string[];
  probabilities: Record<string, number>;
  parents: string[];
  metadata: Record<string, unknown>;
}

export interface BayesianEdge {
  id: string;
  networkId: string;
  sourceNodeId: string;
  targetNodeId: string;
  conditionalProbabilities: Record<string, Record<string, number>>;
  metadata: Record<string, unknown>;
}

export interface CausalGraph {
  id: string;
  name: string;
  description: string;
  nodes: CausalNode[];
  edges: CausalEdge[];
  metadata: Record<string, unknown>;
}

export interface CausalNode {
  id: string;
  graphId: string;
  name: string;
  type: string;
  properties: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface CausalEdge {
  id: string;
  graphId: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: string;
  strength: number;
  direction: string;
  metadata: Record<string, unknown>;
}

export interface InfluenceDiagram {
  id: string;
  name: string;
  description: string;
  decisionNodes: DecisionNode[];
  chanceNodes: ChanceNode[];
  valueNodes: ValueNode[];
  edges: InfluenceEdge[];
  metadata: Record<string, unknown>;
}

export interface ChanceNode {
  id: string;
  diagramId: string;
  name: string;
  states: string[];
  probabilities: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface ValueNode {
  id: string;
  diagramId: string;
  name: string;
  function: string;
  parameters: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface InfluenceEdge {
  id: string;
  diagramId: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: string;
  metadata: Record<string, unknown>;
}

export interface MarkovDecisionProcess {
  id: string;
  name: string;
  description: string;
  states: MDPState[];
  actions: MDPAction[];
  transitions: MDPTransition[];
  rewards: MDPReward[];
  discountFactor: number;
  metadata: Record<string, unknown>;
}

export interface MDPState {
  id: string;
  mdpId: string;
  name: string;
  properties: Record<string, unknown>;
  terminal: boolean;
  metadata: Record<string, unknown>;
}

export interface MDPAction {
  id: string;
  mdpId: string;
  name: string;
  cost: number;
  metadata: Record<string, unknown>;
}

export interface MDPTransition {
  id: string;
  mdpId: string;
  stateId: string;
  actionId: string;
  nextStateId: string;
  probability: number;
  metadata: Record<string, unknown>;
}

export interface MDPReward {
  id: string;
  mdpId: string;
  stateId: string;
  actionId: string;
  value: number;
  metadata: Record<string, unknown>;
}

export interface GameTheoryModel {
  id: string;
  name: string;
  description: string;
  players: GamePlayer[];
  strategies: GameStrategy[];
  payoffs: GamePayoff[];
  equilibrium: GameEquilibrium;
  metadata: Record<string, unknown>;
}

export interface GamePlayer {
  id: string;
  gameId: string;
  name: string;
  type: string;
  strategies: string[];
  metadata: Record<string, unknown>;
}

export interface GameStrategy {
  id: string;
  gameId: string;
  playerId: string;
  name: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface GamePayoff {
  id: string;
  gameId: string;
  strategyProfile: string[];
  payoffs: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface GameEquilibrium {
  id: string;
  gameId: string;
  type: string;
  strategies: Record<string, string>;
  payoffs: Record<string, number>;
  stable: boolean;
  metadata: Record<string, unknown>;
}

export interface MultiCriteriaDecision {
  id: string;
  name: string;
  description: string;
  alternatives: MCDAlternative[];
  criteria: MCDCriteria[];
  weights: Record<string, number>;
  method: string;
  result: MCDResult;
  metadata: Record<string, unknown>;
}

export interface MCDAlternative {
  id: string;
  mcdId: string;
  name: string;
  description: string;
  scores: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface MCDCriteria {
  id: string;
  mcdId: string;
  name: string;
  description: string;
  type: string;
  weight: number;
  direction: string;
  metadata: Record<string, unknown>;
}

export interface MCDResult {
  id: string;
  mcdId: string;
  ranking: string[];
  scores: Record<string, number>;
  sensitivity: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface FuzzyLogicSystem {
  id: string;
  name: string;
  description: string;
  variables: FuzzyVariable[];
  rules: FuzzyRule[];
  defuzzification: string;
  metadata: Record<string, unknown>;
}

export interface FuzzyVariable {
  id: string;
  systemId: string;
  name: string;
  type: string;
  range: [number, number];
  membershipFunctions: FuzzyMembershipFunction[];
  metadata: Record<string, unknown>;
}

export interface FuzzyMembershipFunction {
  id: string;
  variableId: string;
  name: string;
  type: string;
  parameters: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface FuzzyRule {
  id: string;
  systemId: string;
  antecedent: string;
  consequent: string;
  weight: number;
  metadata: Record<string, unknown>;
}

export interface GeneticAlgorithm {
  id: string;
  name: string;
  description: string;
  populationSize: number;
  generations: number;
  mutationRate: number;
  crossoverRate: number;
  fitnessFunction: string;
  chromosomes: GeneticChromosome[];
  bestSolution: GeneticChromosome;
  metadata: Record<string, unknown>;
}

export interface GeneticChromosome {
  id: string;
  algorithmId: string;
  genes: Record<string, unknown>;
  fitness: number;
  generation: number;
  metadata: Record<string, unknown>;
}

export interface SimulatedAnnealing {
  id: string;
  name: string;
  description: string;
  initialTemperature: number;
  coolingRate: number;
  minTemperature: number;
  iterations: number;
  currentSolution: SASolution;
  bestSolution: SASolution;
  metadata: Record<string, unknown>;
}

export interface SASolution {
  id: string;
  variables: Record<string, number>;
  objectiveValue: number;
  feasible: boolean;
  metadata: Record<string, unknown>;
}

export interface ParticleSwarmOptimization {
  id: string;
  name: string;
  description: string;
  swarmSize: number;
  inertiaWeight: number;
  cognitiveWeight: number;
  socialWeight: number;
  particles: PSOParticle[];
  bestPosition: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface PSOParticle {
  id: string;
  psoId: string;
  position: Record<string, number>;
  velocity: Record<string, number>;
  bestPosition: Record<string, number>;
  bestFitness: number;
  fitness: number;
  metadata: Record<string, unknown>;
}

export interface AntColonyOptimization {
  id: string;
  name: string;
  description: string;
  colonySize: number;
  evaporationRate: number;
  alpha: number;
  beta: number;
  pheromones: Record<string, number>;
  bestTour: string[];
  bestDistance: number;
  metadata: Record<string, unknown>;
}

export interface NeuralNetwork {
  id: string;
  name: string;
  description: string;
  layers: NeuralLayer[];
  activations: string[];
  lossFunction: string;
  optimizer: string;
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface NeuralLayer {
  id: string;
  networkId: string;
  name: string;
  type: string;
  neurons: number;
  activation: string;
  weights: number[][];
  biases: number[];
  metadata: Record<string, unknown>;
}

export interface DeepReinforcementLearning {
  id: string;
  name: string;
  description: string;
  algorithm: string;
  network: NeuralNetwork;
  experienceReplay: ReinforcementExperience[];
  targetNetwork?: NeuralNetwork;
  metrics: ReinforcementMetrics;
  metadata: Record<string, unknown>;
}

export interface EnsembleModel {
  id: string;
  name: string;
  description: string;
  models: EnsembleMember[];
  aggregationMethod: string;
  weights: Record<string, number>;
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface EnsembleMember {
  id: string;
  ensembleId: string;
  modelType: string;
  modelId: string;
  weight: number;
  performance: number;
  metadata: Record<string, unknown>;
}

export interface TransferLearningModel {
  id: string;
  name: string;
  description: string;
  sourceModelId: string;
  targetDomain: string;
  fineTuningLayers: string[];
  frozenLayers: string[];
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface MetaLearningModel {
  id: string;
  name: string;
  description: string;
  algorithm: string;
  innerLoopOptimizer: string;
  outerLoopOptimizer: string;
  supportTasks: string[];
  queryTasks: string[];
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface FederatedLearningModel {
  id: string;
  name: string;
  description: string;
  algorithm: string;
  clients: string[];
  rounds: number;
  aggregationMethod: string;
  metrics: Record<string, number>;
  privacyBudget: number;
  metadata: Record<string, unknown>;
}

export interface ExplainableAI {
  id: string;
  modelId: string;
  method: string;
  level: ExplainabilityLevel;
  explanations: XAIExplanation[];
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface XAIExplanation {
  id: string;
  xaiId: string;
  type: ExplanationType;
  content: Record<string, unknown>;
  confidence: number;
  fidelity: number;
  metadata: Record<string, unknown>;
}

export interface DecisionSupportSystem {
  id: string;
  name: string;
  description: string;
  components: DSSComponent[];
  inputs: DSSInput[];
  outputs: DSSOutput[];
  models: string[];
  status: string;
  metadata: Record<string, unknown>;
}

export interface DSSComponent {
  id: string;
  dssId: string;
  type: string;
  name: string;
  configuration: Record<string, unknown>;
  dependencies: string[];
  metadata: Record<string, unknown>;
}

export interface DSSInput {
  id: string;
  dssId: string;
  name: string;
  type: string;
  source: string;
  required: boolean;
  metadata: Record<string, unknown>;
}

export interface DSSOutput {
  id: string;
  dssId: string;
  name: string;
  type: string;
  format: string;
  destination: string;
  metadata: Record<string, unknown>;
}

export interface DecisionEngine {
  id: string;
  name: string;
  description: string;
  graph: DecisionGraph;
  rules: DecisionRule[];
  policies: Policy[];
  optimization: OptimizationProblem;
  scenarios: Scenario[];
  explainability: ExplainableDecision;
  audit: DecisionAudit[];
  metrics: DecisionMetrics;
  status: DecisionStatus;
  version: number;
  metadata: Record<string, unknown>;
}

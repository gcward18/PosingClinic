from collections import deque
from dataclasses import dataclass
from datetime import datetime

@dataclass
class EvaluationStatus:
    id: int
    status: str
    created_at: datetime
    result: str = None

# create a queue to hold evaluations
evaluation_queue = deque()
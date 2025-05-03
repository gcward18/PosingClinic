from alembic.config import Config
from alembic import command
import os


def run_migrations():
    # Get the directory containing this file
    basedir = os.path.abspath(os.path.dirname(__file__))
    
    # Create Alembic configuration
    alembic_cfg = Config(os.path.join(basedir, "alembic.ini"))
    
    # Generate migration
    command.revision(alembic_cfg, autogenerate=True)
    
    # Run migration
    command.upgrade(alembic_cfg, "head")


if __name__ == "__main__":
    run_migrations()

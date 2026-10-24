from src.main import app


def test_app_title():
    assert "YatraSathi" in app.title


def test_tagged_parse_failure():
    from src.services.claim_check import parse_tagged

    segments = parse_tagged("this is not tagged")
    assert len(segments) == 1
    assert segments[0].status == "unknown"
